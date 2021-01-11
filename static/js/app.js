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
  console.log(names);
  console.log(metaData);
  console.log(samples);
}

//
// Initialize the application
// init - callback function for specific elements and chart initialization
//
initApp(init);

