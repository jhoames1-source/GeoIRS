const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  const iconPath = path.join(__dirname, '../public/icon.ico');
  const fallbackIcon = path.join(__dirname, '../public/portada/Logo_Icon.png');

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'GeoIRS - Plataforma Espacial IRS (Perú)',
    icon: fs.existsSync(iconPath) ? iconPath : fallbackIcon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true
    },
    autoHideMenuBar: true,
    backgroundColor: '#020617'
  });

  // Permitir inspeccionar con F12 o Ctrl+Shift+I
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12' || (input.control && input.shift && input.key.toLowerCase() === 'i')) {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    const indexPath = path.join(__dirname, '../dist/index.html');
    mainWindow.loadFile(indexPath).catch(err => {
      console.error('Error al cargar index.html:', err);
    });
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
    const cleanRel = decodeURIComponent(relativePath).replace(/^\/(CAPAS|capas)\//i, '');
    const cleanRelNoExt = cleanRel.replace(/\.(geojson|kmz|kml|json)$/i, '');

    const searchDirs = [
      app.isPackaged ? path.join(process.resourcesPath, 'capas') : path.join(__dirname, '../CAPAS'),
      path.join(__dirname, '../public/capas'),
      path.join(__dirname, '../dist/capas'),
      path.join(__dirname, '../CAPAS')
    ];

    let targetPath = null;

    for (const dir of searchDirs) {
      if (!dir || !fs.existsSync(dir)) continue;

      // 1. Verificación directa
      const direct = path.join(dir, cleanRel);
      if (fs.existsSync(direct) && fs.statSync(direct).isFile()) {
        targetPath = direct;
        break;
      }

      // 2. Búsqueda inteligente case-insensitive y tolerante a guiones/espacios
      try {
        const files = fs.readdirSync(dir);
        const match = files.find(f => {
          const fLower = f.toLowerCase();
          const targetLower = cleanRel.toLowerCase();
          if (fLower === targetLower) return true;
          const fNoExt = fLower.replace(/\.[^.]+$/, '');
          const targetNoExt = cleanRelNoExt.toLowerCase();
          return fNoExt === targetNoExt || fNoExt.replace(/[-_ ]/g, '') === targetNoExt.replace(/[-_ ]/g, '');
        });
        if (match) {
          const matchedPath = path.join(dir, match);
          if (fs.statSync(matchedPath).isFile()) {
            targetPath = matchedPath;
            break;
          }
        }
      } catch (errDir) {
        // Ignorar error al leer directorio
      }
    }

    if (!targetPath) {
      return { success: false, error: 'File not found on disk: ' + cleanRel };
    }

    if (targetPath.toLowerCase().endsWith('.geojson') || targetPath.toLowerCase().endsWith('.json')) {
      const text = fs.readFileSync(targetPath, 'utf8');
      return { success: true, format: 'json', text };
    } else {
      const buffer = fs.readFileSync(targetPath);
      return { success: true, format: 'binary', buffer };
    }
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
