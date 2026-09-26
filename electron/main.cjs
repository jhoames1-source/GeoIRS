const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'GeoIRS - Plataforma Espacial IRS (Perú)',
    icon: path.join(__dirname, '../public/portada/Logo_Icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Permite leer capas locales y archivos KMZ/GeoJSON sin bloqueos CORS
    },
    autoHideMenuBar: true,
    backgroundColor: '#020617'
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC para resolver rutas locales de la carpeta CAPAS completa
ipcMain.handle('get-capas-path', () => {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'capas');
  }
  return path.join(__dirname, '../CAPAS');
});

ipcMain.handle('read-local-gis-file', async (event, relativePath) => {
  try {
    const basePath = app.isPackaged 
      ? path.join(process.resourcesPath, 'capas') 
      : path.join(__dirname, '../CAPAS');
    const fullPath = path.join(basePath, relativePath);
    if (fs.existsSync(fullPath)) {
      return { success: true, data: fs.readFileSync(fullPath).toString('base64') };
    }
    return { success: false, error: 'File not found' };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

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
