// Data location
var dataLocation = "data/samples.json";

// Placeholders for the data
var names = [];
var metaData = [];
var samples = [];

//
// Initialize application
//   1. Load the data for the application
//   2. Once #1 loaded run the callBack function
//
function initApp(callBack) {
  d3.json(dataLocation)
    .then((bellyButton) => {
      bellyButton.names.forEach((element) => {
        names.push(element);
      });
      bellyButton.metadata.forEach((element) => {
        metaData.push(element);
      });
      bellyButton.samples.forEach((element) => {
        samples.push(element);
      });
    })
    .then(callBack);
}

//
// initialize the HTML elements and charts
//
function init() {
  // populate the dropdown
  populateDropdown(names);

  // Pull the demographic from the metaData based upon first element of names array
  var targetDemographic = getDemographic(names[0]);

  // Get the target sample based upon first element of names array
  var targetSample = getSample(names[0]);

  // display demographics for named entity
  updateDemograpicInfo(targetDemographic);

  // create our bar trace
  var trace1 = {
    type: "bar",
    orientation: "h",
    x: prepBarData(targetSample.sample_values, 10),
    y: prepBarData(targetSample.otu_ids, 10).map(
      (id) => "OTU " + String(id) + " "
    ),
    text: prepBarData(targetSample.otu_labels, 10),
  };

  // Trace needs to be wrapped in an array
  var data = [trace1];

  // Define a layout
  var layout = {
    xaxis: { title: "Sample Value" },
  };

  // Plot the bar chart
  Plotly.newPlot("bar", data, layout);

  // Setup trace for the bubble chart
  var trace2 = {
    x: targetSample.otu_ids,
    y: targetSample.sample_values,
    mode: "markers",
    marker: {
      size: targetSample.sample_values,
      color: targetSample.otu_ids,
    },
    text: targetSample.otu_labels,
  };

  // Trace needs to be wrapped in an array
  var data2 = [trace2];

  // Define a layout
  var layout2 = {
    xaxis: { title: "OTU ID" },
  };

  // Plot the bubble chart
  Plotly.newPlot("bubble", data2, layout2);

  // Initialize the guage on the page
  initializeGauge(targetDemographic);
}

//
// Function to pull out correct demographic
//
function getDemographic(id) {
  return metaData.filter((element) => element.id === +id)[0];
}

//
// Function to pull out correct sample
//
function getSample(id) {
  return samples.filter((element) => element.id === id)[0];
}

//
// Populate the initial drop down with the values passed
//
function populateDropdown(values) {
  // select the dropdown
  var dropDown = d3.select("#selDataset");

  // populate the options for the select list
  var options = dropDown
    .selectAll("option")
    .data(values)
    .enter()
    .append("option")
    .text((d) => d)
    .attr("value", (d) => d);

  // create the listener on change
  dropDown.on("change", updateDashboard);
}

//
// Update the dashboard elements on the select option change
//
function updateDashboard() {
  // Get the value selected from the dropdown
  var valueSelected = d3.select("#selDataset").node().value;

  // Get the demographic metaData in question
  var targetDemographic = getDemographic(valueSelected);

  // Get the sample in question
  var targetSample = getSample(valueSelected);

  updateDemograpicInfo(targetDemographic);
  updateBarChart(targetSample);
  updateBubbleChart(targetSample);
  updateGauge(targetDemographic);
}

//
// Display demographic data based upon data passed
//
function updateDemograpicInfo(targetDemographic) {
  // Grab the div for demographics we are about to update
  var demographicsDiv = d3.select("#sample-metadata");

  // Clear out previous contents
  demographicsDiv.html("");

  // Loop through and display demographic keys and values
  Object.entries(targetDemographic).forEach(([key, value]) => {
    demographicsDiv.append("text").text(`${key}: ${value}`).append("p");
  });
}

//
// Prep the data to be displayed on the bar chart
// We only want up to "value" in in the array passed
// and we reverse to ensure proper data alignment
//
function prepBarData(data, value) {
  var slicedData = data.slice(0, value);
  return slicedData.reverse();
}

//
// Updates bar chart on change to select drop down
// uses plotly restyle to only update needed elements.
//
function updateBarChart(targetSample) {
  // Restyle to plot with newly selected data element
  Plotly.restyle("bar", "x", [prepBarData(targetSample.sample_values, 10)]);
  Plotly.restyle("bar", "y", [
    prepBarData(targetSample.otu_ids, 10).map(
      (id) => "OTU " + String(id) + " "
    ),
  ]);
  Plotly.restyle("bar", "text", [prepBarData(targetSample.otu_labels, 10)]);
}

//
// Updates bubble chart on change to select drop down
// uses plotly restyle to only update needed elements.
//
function updateBubbleChart(targetSample) {
  // Restyle to plot with newly selected data element
  Plotly.restyle("bubble", "x", [targetSample.otu_ids]);
  Plotly.restyle("bubble", "y", [targetSample.sample_values]);
  Plotly.restyle("bubble", "marker.size", [targetSample.sample_values]);
  Plotly.restyle("bubble", "marker.color", [targetSample.otu_ids]);
  Plotly.restyle("bubble", "text", [targetSample.otu_labels]);
}

//
// Initialize the application
// init - callback function for specific elements and chart initialization
//
initApp(init);
