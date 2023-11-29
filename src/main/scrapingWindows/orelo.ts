import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { initializeTitlebarHandler } from '../ipcHandlers/titlebar'

let oreloWindow: BrowserWindow

export const openOrelo = (): void => {
  if (!oreloWindow) {
    createWindow()
    return
  }

  console.log('orelo')
}

const createWindow = async (): Promise<void> => {
  oreloWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/orelo.js'),
      sandbox: false
    }
  })

  oreloWindow.on('ready-to-show', async () => {
    oreloWindow.show()
  })

  oreloWindow.webContents.setWindowOpenHandler((details) => {
    console.log('details', details)

    const authWindow = new BrowserWindow({
      width: 900,
      height: 670,
      autoHideMenuBar: true,
      webPreferences: {
        preload: join(__dirname, '../preload/orelo.js'),
        sandbox: false
      }
    })

    authWindow.on('close', () => {
      console.log('auth', authWindow.webContents.getURL())
      oreloWindow.loadURL(authWindow.webContents.getURL())
    })

    shell.openExternal(details.url)
    authWindow.loadURL(details.url)
    return { action: 'deny' }
  })

  oreloWindow.loadURL('https://orelo.cc')

  initializeTitlebarHandler(oreloWindow)
}
