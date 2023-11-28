import { shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { initializeTitlebarHandler } from '../ipcHandlers/titlebar'
import { is } from '@electron-toolkit/utils'

let oreloWindow: BrowserWindow

export const openOrelo = (): void => {
  if (!oreloWindow) {
    createWindow()
    return
  }

  console.log('orelo')
}

const createWindow = (): void => {
  oreloWindow = new BrowserWindow({
    width: 900,
    height: 670,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/orelo.js'),
      sandbox: false
    }
  })

  oreloWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'allow' }
  })

  oreloWindow.on('ready-to-show', () => {
    oreloWindow.show()
  })

  oreloWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    oreloWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/orelo')
  }

  initializeTitlebarHandler(oreloWindow)
}
