// const ipc = require('electron').ipcRenderer;

let TESTER;
const rate = 4; // Hz
const N = 60 * rate;
let iteration = 0;
let xx = Array.from({length: N}, (x,i) => i/rate);
let yy = Array(N);

function update(newval) {
  // Plotly.restyle(TESTER
  yy.pop();
  // var newval = Math.random() - 0.5;
  if (typeof yy[0] !== 'undefined') {
    newval = newval + yy[0];
  }
  yy.unshift(newval);
  var update = { x: [xx], y: [yy] };
  Plotly.restyle(TESTER, update, 0);
}

function setup_chart() {
  TESTER = document.getElementById('myPlotlyChart');
  Plotly.newPlot( TESTER, [{
      x: xx,
      y: yy,
      name: 'sum(rand())'
    }], {
      margin: { t: 0 },
      xaxis: {
        autorange: 'reversed',
        title: 'Age sec'
      },
      yaxis: {
        title: 'Y Sturdleys'
      }
    }, {
      responsive: true
    }
  );

  console.log('Setting up send/receive');
  window.api.receive("graphData", (data) => {
    update(data);
    // console.log("Received '" + data + "' from main process");
  });
  window.api.send("startup");
  console.log('Setup send/receive');

}

// Startup and Shutdown
window.onload = setup_chart;
window.onbeforeunload = (e) => {
  window.api.send("shutdown");
}
