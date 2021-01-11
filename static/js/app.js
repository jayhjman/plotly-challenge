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
  d3.json("data/samples.json")
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
  //console.log(names);
  //console.log(metaData);
  //console.log(samples);

  // populate the dropdown
  populateDropdown(names);

  // display demographics for named entity
  displayDemograpicInfo(metaData, names[0]);

  // Get the targe sample identified bay name, filter returns array
  // we want the first element.
  var targetSample = samples.filter((sample) => sample.id === names[0])[0];

  // create our bar trace
  trace1 = {
    type: "bar",
    orientation: "h",
    x: prepBarData(targetSample.sample_values, 10),
    y: prepBarData(targetSample.otu_ids, 10).map((id) => "OTU " + String(id)),
    text: prepBarData(targetSample.otu_labels, 10),
  };

  //console.log(trace1);

  // Trace needs to be wrapped in an array
  var data = [trace1];

  // Plot the bar chart
  Plotly.newPlot("bar", data);
}

//
// Initialize the application
// init - callback function for specific elements and chart initialization
//
initApp(init);

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

  displayDemograpicInfo(metaData, valueSelected);

  updateBarChart(samples, valueSelected);

  //   console.log(`${valueSelected} updateDashboard`);
}

//
// Display demographic data based upon data and name passed
//
function displayDemograpicInfo(data, name) {
  //   console.log(`${name} demographics display`);

  var demographicsDiv = d3.select("#sample-metadata");

  demographicsDiv.html("");

  var targetDemographic = data.filter(
    (element) => element.id === parseInt(name)
  );

  //   console.log(targetDemographic[0]);

  Object.entries(targetDemographic[0]).forEach(([key, value]) => {
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
function updateBarChart(data, name) {
  // Get the sample in question
  var targetSample = samples.filter((sample) => sample.id === name)[0];

  // Restyle to plot with newly selected data element
  Plotly.restyle("bar", "x", [prepBarData(targetSample.sample_values, 10)]);
  Plotly.restyle("bar", "y", [
    prepBarData(targetSample.otu_ids, 10).map((id) => "OTU " + String(id)),
  ]);
  Plotly.restyle("bar", "text", [prepBarData(targetSample.otu_labels, 10)]);
}
