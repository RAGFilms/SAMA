const { app, BrowserWindow, ipcMain, dialog, session } = require('electron')
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
    width: 1280,
    height: 820,
    minWidth: 360,
    minHeight: 520,
    icon: path.join(__dirname, 'SAMA PARTS/icon-256.png'),
    title: 'SAMA',
    backgroundColor: '#00000000',
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,              // renderer runs in the OS sandbox
      webSecurity: true,          // explicit — never disable, it turns off CORS/CSP
      allowRunningInsecureContent: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  /* The renderer displays names from a public radio database and runs remote
     CDN code. If anything ever injects a link or a redirect, these stop it
     from turning into "the app window is now a website":
       - will-navigate     : refuse to leave the local page
       - windowOpenHandler : refuse popups outright
       - permissions       : the app needs none, so deny them all */
  mainWin.webContents.on('will-navigate', (e, url) => {
    if (url !== mainWin.webContents.getURL()) e.preventDefault()
  })
  mainWin.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  mainWin.webContents.session.setPermissionRequestHandler((_wc, _perm, cb) => cb(false))

  const win = mainWin

  win.loadFile('index.html')
  win.setMenuBarVisibility(false)
  // No aspect-ratio lock — the UI is a fluid grid and needs to reflow freely.

  ipcMain.on('win-minimize',   () => win.minimize())
  ipcMain.on('win-maximize',   () => win.isMaximized() ? win.unmaximize() : win.maximize())
  ipcMain.on('win-close',      () => win.close())

  // VIZ mode — fullscreen
  ipcMain.on('win-enter-viz', () => {
    win.setFullScreen(true)
  })
  ipcMain.on('win-exit-viz',  () => {
    win.setFullScreen(false)
  })

  win.webContents.on('did-finish-load', () => {
    // The topbar declares its own -webkit-app-region:drag (with no-drag on the
    // controls), and the layout is a fluid grid — so the old injected drag strip,
    // dots guard and transform-scaling are all gone. Only the VIZ fullscreen
    // hook still needs to live here.
    // NOTE the trailing `undefined;`. executeJavaScript sends the last
    // expression's value back over IPC, and an assignment evaluates to the thing
    // assigned — here a function, which cannot be structured-cloned. Without it
    // this rejects with "An object could not be cloned".
    win.webContents.executeJavaScript(`
      (function () {
        var _origSetMode = setMode;
        var _inViz = false;
        setMode = function (m) {
          _origSetMode(m);
          if (m === 'viz') {
            _inViz = true;
            window.electronAPI.enterViz();
          } else if (_inViz) {
            _inViz = false;
            window.electronAPI.exitViz();
          }
        };
      })();
      undefined;
    `).catch(err => console.error('viz hook injection failed:', err))
  })
}

/* Clear any service worker before the window loads.
   The app runs from file://, where a registered worker intercepts its own
   navigation and cannot fetch the URL — the window comes up blank with
   ERR_FAILED. Worse, the worker persists in the user-data profile, so it keeps
   blocking index.html on every launch and the page can never repair itself.
   Wiping it here is the only place that runs BEFORE the load.
   Only 'serviceworkers' and 'cachestorage' are cleared — localStorage, which
   holds themes, radio presets and saved custom streams, is untouched. */
async function startUp() {
  try {
    // Only 'serviceworkers'. Including 'cachestorage' here made Chromium reset
    // its quota database on every launch ("Could not open the quota database"),
    // and it is pointless anyway — with no worker registered nothing reads
    // those caches. localStorage (themes, presets, saved streams) is untouched.
    await session.defaultSession.clearStorageData({ storages: ['serviceworkers'] })
  } catch (err) {
    console.error('Service worker cleanup failed:', err)
  }
  createWindow()
}

app.whenReady().then(startUp)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
