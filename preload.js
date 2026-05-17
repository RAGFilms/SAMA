const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minimize:       () => ipcRenderer.send('win-minimize'),
  maximize:       () => ipcRenderer.send('win-maximize'),
  close:          () => ipcRenderer.send('win-close'),
  enterViz:       () => ipcRenderer.send('win-enter-viz'),
  exitViz:        () => ipcRenderer.send('win-exit-viz'),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog')
})
