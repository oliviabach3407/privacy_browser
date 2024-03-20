const { app, BrowserWindow, globalShortcut, ipcMain, session } = require('electron');
const path = require('path');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');

async function enableAdBlocker() {
  try {
    const blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);
    if (session.defaultSession) {
      blocker.enableBlockingInSession(session.defaultSession);
      console.log('Ad and tracker blocker enabled!');
    } else {
      console.error('Default session not available.');
    }
  } catch (error) {
    console.error('Error enabling ad and tracker blocker:', error);
  }
}// a comment

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    }
  });

//set window always on top for prototyping
  mainWindow.setAlwaysOnTop(true, 'floating');

  mainWindow.once('ready-to-show', () => {
    mainWindow.setIcon(path.resolve(__dirname, './assets/icon2.png'));
    mainWindow.show();
  });

  mainWindow.loadFile('index.html');

  // Intercepting network requests to block ads
  const filter = {
    urls: ['*://*/*'],
  };

  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    if (isAdDomain(details.url)) {
      callback({ cancel: true });
    } else {
      callback({ cancel: false });
    }
  });

  // Enable ad blocker
  enableAdBlocker();

  // Set up DevTools shortcut
  globalShortcut.register('F12', () => {
    mainWindow.webContents.toggleDevTools();
  });

  // Handle window activation
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Handle app quitting
  app.on('will-quit', () => {
    // Unregister all shortcuts when quitting
    globalShortcut.unregisterAll();
  });

  // Handle IPC event for fetching cookies
  ipcMain.on('get-cookies', (event) => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      const { session } = win.webContents;
      session.cookies.get({}).then((cookies) => {
        event.reply('cookies', cookies);
      }).catch((error) => {
        console.error('Error fetching cookies:', error);
      });
    }
  });
}

function isAdDomain(url) {
  const adDomains = [
    'doubleclick.net',
    'googlesyndication.com',
    'facebook.com',
    'twitter.com',
    'foxnews.com',
    'analytics.google.com',
    'scorecardresearch.com',
    'adnxs.com',
    'adsrvr.org',
    'openx.net',
    'popads.net',
    'popcash.net',
    // Add more ad domains as needed
  ];
  return adDomains.some(domain => url.includes(domain));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});