const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

// Module-level win reference so the file-dialog handler (registered once) can use it
let mainWin = null

// Register IPC handlers at module level — never inside createWindow() — to avoid
// "Attempted to register a second handler" errors on any reload / re-activation.
ipcMain.handle('open-file-dialog', async () => {
  // Show dialog without attaching to mainWin: transparent frameless windows on
  // Windows lose focus and the dialog never surfaces when parented to the window.
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Audio Files', extensions: ['mp3', 'wav', 'mid', 'midi'] }]
  })
  return canceled ? [] : filePaths
})

function createWindow() {
  mainWin = new BrowserWindow({
    width: 1228,
    height: 952,
    minWidth: 614,
    minHeight: 476,
    icon: path.join(__dirname, 'SAMA PARTS/icon-256.png'),
    title: 'SAMA',
    backgroundColor: '#00000000',
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const win = mainWin

  win.loadFile('index.html')
  win.setMenuBarVisibility(false)
  win.setAspectRatio(1228 / 952)

  ipcMain.on('win-minimize',   () => win.minimize())
  ipcMain.on('win-maximize',   () => win.isMaximized() ? win.unmaximize() : win.maximize())
  ipcMain.on('win-close',      () => win.close())

  // VIZ mode — fullscreen
  ipcMain.on('win-enter-viz', () => {
    win.setAspectRatio(0)          // release ratio lock for fullscreen
    win.setFullScreen(true)
  })
  ipcMain.on('win-exit-viz',  () => {
    win.setFullScreen(false)
    win.setSize(1228, 952)
    win.setAspectRatio(1228 / 952) // restore ratio lock
  })

  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
      // Transparent background — removes black corner triangles
      document.documentElement.style.background = 'transparent';
      document.body.style.background = 'transparent';

      // Wire dot buttons
      function doMinimize() { window.electronAPI.minimize(); }
      function doMaximize() { window.electronAPI.maximize(); }
      function doClose()    { window.electronAPI.close();    }

      // Hook setMode to trigger VIZ fullscreen — only fire exit when actually leaving viz
      const _origSetMode = setMode;
      let _inViz = false;
      setMode = function(m) {
        _origSetMode(m);
        if (m === 'viz') {
          _inViz = true;
          window.electronAPI.enterViz();
        } else if (_inViz) {
          _inViz = false;
          window.electronAPI.exitViz();
        }
      };

      // Fix scaling — allow scale beyond 1x
      window.removeEventListener('resize', scaleUI);
      function scaleUI() {
        const s = Math.min(window.innerWidth / 1228, window.innerHeight / 952);
        sama.style.transform  = 'scale(' + s + ')';
        sama.style.marginLeft = ((window.innerWidth  - 1228 * s) / 2) + 'px';
        sama.style.marginTop  = ((window.innerHeight - 952  * s) / 2) + 'px';
      }
      window.addEventListener('resize', scaleUI);
      scaleUI();

      // Drag strip — top of panel
      const dragBar = document.createElement('div');
      dragBar.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:22px;-webkit-app-region:drag;z-index:9999;pointer-events:none';
      document.body.appendChild(dragBar);
    `)
  })
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
