const { app, BrowserWindow } = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
      width: 1366,
      height: 768
    })
  
    win.loadFile('index.html')
  };
  app.whenReady().then(() => {
    createWindow()
  })