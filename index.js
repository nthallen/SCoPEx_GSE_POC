// const ipc = require('electron').ipcRenderer;

let TESTER;
const rate = 4; // Hz
const N = 60 * rate;
let iteration = 0;
let xx = Array.from({length: N}, (x,i) => i/rate);
let yy = Array(N);

function update() {
  // Plotly.restyle(TESTER
  yy.pop();
  var newval = Math.random() - 0.5;
  if (typeof yy[0] !== 'undefined') {
    newval = newval + yy[0];
  }
  yy.unshift(newval);
  var update = { x: [xx], y: [yy] };
  Plotly.restyle(TESTER, update, 0);
}

function display_chart2() {
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
  const interval = setInterval(() => {
      iteration = iteration+1;
      // console.log("Interval " + iteration);
      update();
    }, 1000/rate);
}

// https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function() {
  console.log('Setting up send/receive');
  window.api.receive("fromMain", (data) => {
      console.log("Received '" + data + "' from main process");
  });
  window.api.send("toMain", "some data");
  console.log('Setup send/receive');
});
