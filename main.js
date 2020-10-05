const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  win.setMenuBarVisibility(false);
  // win.webContents.openDevTools();
  win.loadFile('index.html');

  // const interval = setInterval(() => {
      // win.send('send_data', Math.random());
    // }, 1000);
}

app.whenReady().then(createWindow)
