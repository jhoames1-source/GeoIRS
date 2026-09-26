const { ipcRenderer } = require('electron');

window.isElectron = true;
window.electronAPI = {
  getCapasPath: () => ipcRenderer.invoke('get-capas-path'),
  readLocalGISFile: (relativePath) => ipcRenderer.invoke('read-local-gis-file', relativePath)
};
