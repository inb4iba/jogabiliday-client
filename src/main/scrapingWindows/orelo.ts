import { BrowserView, BrowserWindow } from 'electron'
import { join } from 'path'
import { initializeWindowHandler } from '../ipcHandlers/window'
import { is } from '@electron-toolkit/utils'

let oreloWindow: BrowserWindow

export const openOrelo = (): void => {
  if (!oreloWindow) {
    createWindow()
    return
  }
}

const createWindow = async (): Promise<void> => {
  oreloWindow = new BrowserWindow({
    title: 'Orelo',
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

  const view = new BrowserView()
  oreloWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 40, width: 900, height: 630 })
  view.setAutoResize({ width: true, height: true })
  await view.webContents.loadURL('https://orelo.cc/')
  // await view.webContents.loadURL(`https://orelo.cc/podcast/${id}/metricas`)
  view.webContents.executeJavaScript(`
    setTimeout(() => {
      const cards = [...document.querySelectorAll('.MuiCard-root')]
      const [contributors, value] = cards.filter(card =>
        card.children[0].textContent.toLowerCase().includes('apoi')).map(card =>
        card.children[1].textContent)
    }, 10000)
  `)

  oreloWindow.on('ready-to-show', async () => {
    oreloWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    oreloWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/external')
  } else {
    oreloWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  initializeWindowHandler(oreloWindow, 'ORELO')
}
