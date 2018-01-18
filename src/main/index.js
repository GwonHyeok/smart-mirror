'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import ApplicationLoader from './loader/ApplicationLoader'
import PackageManager from './package/manager/PackageManager'
import { mainWindowProvider } from './util/MainWindowProvider'

import applicationProvider from './util/ApplicationProvider'
import vueProvider from './util/VueProvider'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {

  // Create Main Window
  mainWindowProvider.createMainWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })
  mainWindowProvider.getMainWindow().loadURL(winURL)
  mainWindowProvider.getMainWindow().on('closed', () => mainWindowProvider.updateMainWindow(null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWIndowProvider.getMainWindow() === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

/**
 * splash page can call this events
 * 
 * when mounted splash component, call this event
 */
ipcMain.on('initialize-user-applications', (event, arg) => {

  // Initialize Application
  const applicationLoader = new ApplicationLoader()
  const packageManager = new PackageManager()

  // Load Application
  applicationLoader.loadUserApplicatioin()
    .then(userApplications => applicationProvider.setUserApplicationInfos(userApplications))
    .then(_ => applicationProvider.getUserApplicationInfos())
    .then(userApplications => packageManager.registerPackages(userApplications))
    .then(result => mainWindowProvider.getMainWindow().webContents.send('launchApp'))
})

// Setup Global Variables
global.applicationProvider = applicationProvider