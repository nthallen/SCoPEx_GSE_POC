const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");

let win;

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

  // and load the index.html of the app.
  //win.setMenuBarVisibility(false);
  // win.webContents.openDevTools();
  win.loadFile('index.html');

  // const interval = setInterval(() => {
      // win.send('send_data', Math.random());
    // }, 1000);
}

app.whenReady().then(createWindow)

ipcMain.on("toMain", (event, args) => {
  // fs.readFile("path/to/file", (error, data) => {
    // Do something with file contents

    // Send result back to renderer process
  win.webContents.send("fromMain", "A Message: " + args);
});
