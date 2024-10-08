const { app, BrowserWindow } = require('electron');
const path = require('path');

async function createWindow() {
  await connectToDatabase(); // Ensure the database is connected before creating the window
  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
