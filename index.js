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

// ipcRenderer.on('send_data', (event, val) => {
    // console.log("Received value " + val);
  // });
