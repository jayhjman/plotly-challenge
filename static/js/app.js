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

  populateDropdown(names);
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

  console.log(`${valueSelected} updateDashboard`);
}
