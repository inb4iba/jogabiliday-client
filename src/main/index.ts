import { app, shell, BrowserWindow, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { initializeWindowHandler } from './ipcHandlers/window'
import { initializeMainHandler } from './ipcHandlers/main'
import { Data, WindowTitle } from './types/types'
import { checkOreloErrors, startOreloScraping, stopOreloScraping } from './scrapingWindows/orelo'
import { checkTipaErrors, startTipaScraping, stopTipaScraping } from './scrapingWindows/tipa'
import { closeServer, initializeServer, sendMessage } from './server'
import 'dotenv/config'
import { checkShirtsErrors, startShirtsScraping } from './scrapingWindows/shirts'

let mainWindow: BrowserWindow

export const sendHideWindow = (title: WindowTitle): void => {
  mainWindow.webContents.send(`on_${title.toLowerCase()}_hide`)
}

export const startServer = async (oreloId: string): Promise<Data> => {
  try {
    await checkOreloErrors(oreloId)
    await checkTipaErrors()
    await checkShirtsErrors()
    startOreloScraping()
    startTipaScraping()
    startShirtsScraping()
    return { type: 'data', data: { message: 'connected' } }
  } catch (error) {
    if (error instanceof Error) return { type: 'error', data: { message: error.message } }
    return { type: 'error' }
  }
}

export const stopServer = async (): Promise<Data> => {
  try {
    stopOreloScraping()
    stopTipaScraping()
    await closeServer()
    return { type: 'data', data: { message: 'disconnected' } }
  } catch (error) {
    if (error instanceof Error) return { type: 'error', data: { message: error.message } }
    return { type: 'error' }
  }
}

function createWindow(): void {
  globalShortcut.register('CommandOrControl+Alt+PageUp', () => {
    sendMessage('SHIRTS', 1)
  })
  globalShortcut.register('CommandOrControl+Alt+PageDown', () => {
    sendMessage('SHIRTS', -1)
  })
  globalShortcut.register('CommandOrControl+Alt+Home', () => {
    sendMessage('SUPPORTERS', 1)
  })
  globalShortcut.register('CommandOrControl+Alt+End', () => {
    sendMessage('SUPPORTERS', -1)
  })

  mainWindow = new BrowserWindow({
    title: 'Jogabiliday Client',
    width: 480,
    height: 670,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/main.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  initializeWindowHandler(mainWindow, 'MAIN')
  initializeMainHandler()
  initializeServer()
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
