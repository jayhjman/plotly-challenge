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

  console.log(`${valueSelected} updateDashboard`);
}

function displayDemograpicInfo(data, name) {
  console.log(`${name} demographics display`);

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
