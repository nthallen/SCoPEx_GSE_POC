const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");

let win;
let dataInterval;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      enableRemoteMode: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // win.setMenuBarVisibility(false);
  // win.webContents.openDevTools();
  win.loadFile('index.html');
}

app.whenReady().then(createWindow)

ipcMain.on("startup", (event, args) => {
  const rate = 4;
  dataInterval = setInterval(() => {
      win.webContents.send('graphData', Math.random() - 0.5);
    }, 1000/rate);
});

ipcMain.on("shutdown", (event, args) => {
    if (typeof(dataInterval) !== 'undefined') {
      clearInterval(dataInterval);
      dataInterval = undefined;
    }
  }
);
