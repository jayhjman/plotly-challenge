function initializeGauge(targetDemographic) {
  // Setup data element for the gauge
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: targetDemographic.wfreq,
      type: "indicator",
      title: {
        text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
      },
      mode: "gauge+number",
      gauge: {
        bar: { color: "darkgreen" },
        axis: {
          range: [null, 9],
          tick0: 0,
          dtick: 1,
        },
        steps: [
          { range: [0, 1], color: "#F8F3EC" },
          { range: [1, 2], color: "#F4F1E5" },
          { range: [2, 3], color: "#E9E6CA" },
          { range: [3, 4], color: "#E2E4B1" },
          { range: [4, 5], color: "#D5E49D" },
          { range: [5, 6], color: "#B7CC92" },
          { range: [6, 7], color: "#8CBF88" },
          { range: [7, 8], color: "#8ABB8F" },
          { range: [8, 9], color: "#85B48A" },
        ],
      },
    },
  ];

  // Set the layout margins
  var layout = {
    margin: { t: 0, b: 0 },
  };

  // Plot the gauge
  Plotly.newPlot("gauge", data, layout);
}

//
// Update that gauge with the washing frequency
//
function updateGauge(targetDemographic) {
  // Restyle the plot
  Plotly.restyle("gauge", "value", [targetDemographic.wfreq]);
}
