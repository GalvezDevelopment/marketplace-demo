const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: join(__dirname, '/preload.js')
    }
  });
  win.webContents.openDevTools();
  win.loadURL('http://localhost:4200/');
};

app.whenReady().then(() => {
  ipcMain.handle('wallet:amount', async () => 200);
  createWindow();
});
