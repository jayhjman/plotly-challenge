# Belly Button Biodiversity

- **_Belly Button Biodiversity_** - Is based off a data set that catalogs the microbes that colonize human navels. In this code we create 3 Plotly charts, a bar chart for the top 10 operational taxonomic units, a bubble chart for displaying each sampling bacterial amount, and a gauge that shows the frequency at which the belly buttons are washed. Additionally, a demographic table is shown with information about the sample individual. All of this is tied together via a drop down that lets you change the sample subject to show a dashboard specific to them.

## Files

- [`index.html`](index.html) - Index page that has the base html to place the charts and demographics

- [`static/js/app.js`](static/js/app.js) - The primary application code file, it contains the code to initialize the charts/demographics and then capture events to update the page based upon the test subject id

- [`static/js/bonus.js`](static/js/bonus.js) - This code is specific to the belly button washing frequency gauge. These functions are called by the main [`static/js/app.js`](static/js/app.js) file

- [`data/samples.json`](data/samples.json) - The source dataset for Belly Button Biodiversity

## Results

- Please follow the instructions in the **_Execution_** section below

## Execution

1. To view the interactive dashboard page `Cntrl + Click` [here](https://jayhjman.github.io/plotly-challenge/) to open in another tab

## Author

Made by [Jay](https://www.linkedin.com/in/jay-hastings-techy/) with :heart: in 2021
