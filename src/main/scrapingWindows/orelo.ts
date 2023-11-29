import { BrowserWindow } from 'electron'
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

const createWindow = async (): Promise<void> => {
  oreloWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/orelo.js'),
      sandbox: false
    }
  })

  oreloWindow.on('ready-to-show', async () => {
    oreloWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    oreloWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/orelo')
  } else {
    oreloWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // oreloWindow.loadURL('http://orelo.cc')

  initializeTitlebarHandler(oreloWindow)
}
