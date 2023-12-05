import { BrowserView, BrowserWindow } from 'electron'
import { join } from 'path'
import { initializeWindowHandler } from '../ipcHandlers/window'
import { is } from '@electron-toolkit/utils'
import { sleep } from '../utils/sleep'

let tipaWindow: BrowserWindow | undefined
let removeListeners: () => void | undefined

export const openTipa = (): void => {
  if (!tipaWindow) createWindow()
}

export const closeTipa = (): void => {
  if (tipaWindow) tipaWindow.close()
}

export const showTipa = (): void => {
  if (tipaWindow) tipaWindow.show()
}

export const hideTipa = (): void => {
  if (tipaWindow) tipaWindow.hide()
}

export const checkTipaErrors = async (): Promise<BrowserView> => {
  if (!tipaWindow) throw new Error('Tipa Ai: Janela não está aberta')
  const view = tipaWindow.getBrowserView()
  if (!view) throw new Error('Tipa Ai: Ocorreu um erro ao carregar a página')
  await view.webContents.loadURL(`https://tipa.ai/dashboard`)
  await sleep(2000)
  if (view.webContents.getURL().includes('login')) throw new Error('Tipa Ai: Não conectado')
  return view
}

export const startTipaScraping = (): void => {
  if (!tipaWindow) return
  const view = tipaWindow.getBrowserView()
  if (!view) return
  setInterval(async () => {
    view.webContents.reload()
    await sleep(5000)
    // TODO update scrap code
    // view.webContents.executeJavaScript(`
    //   const cards = [...document.querySelectorAll('.MuiCard-root')]
    //   const [contributors, value] = cards.filter(card =>
    //     card.children[0].textContent.toLowerCase().includes('apoi')).map(card =>
    //     card.children[1].textContent)
    //   window.oreloApi.sendData({contributors, value})
    // `)
  }, 60000)
}

const createWindow = async (): Promise<void> => {
  tipaWindow = new BrowserWindow({
    title: 'Tipa Ai',
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/tipa.js'),
      sandbox: false
    }
  })

  const view = new BrowserView({
    webPreferences: {
      preload: join(__dirname, '../preload/tipaView.js')
    }
  })
  tipaWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 40, width: 900, height: 630 })
  view.setAutoResize({ width: true, height: true })
  await view.webContents.loadURL('https://tipa.ai/')

  tipaWindow.on('ready-to-show', async () => {
    if (tipaWindow) {
      tipaWindow.show()
    }
  })

  tipaWindow.on('close', async () => {
    removeListeners()
    tipaWindow = undefined
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    tipaWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/external')
  } else {
    tipaWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  removeListeners = initializeWindowHandler(tipaWindow, 'TIPA')
}
