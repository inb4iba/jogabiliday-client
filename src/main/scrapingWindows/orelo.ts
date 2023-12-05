import { BrowserView, BrowserWindow } from 'electron'
import { join } from 'path'
import { initializeWindowHandler } from '../ipcHandlers/window'
import { is } from '@electron-toolkit/utils'
import { sleep } from '../utils/sleep'

let oreloWindow: BrowserWindow | undefined
let removeListeners: () => void | undefined

export const openOrelo = (): void => {
  if (!oreloWindow) createWindow()
}

export const closeOrelo = (): void => {
  if (oreloWindow) oreloWindow.close()
}

export const showOrelo = (): void => {
  if (oreloWindow) oreloWindow.show()
}

export const hideOrelo = (): void => {
  if (oreloWindow) oreloWindow.hide()
}

const checkErrors = async (id: string): Promise<BrowserView> => {
  if (!oreloWindow) throw new Error('Janela da Orelo não está aberta')
  if (!id) throw new Error('O ID da Orelo precisa estar preenchido')
  const view = oreloWindow.getBrowserView()
  if (!view) throw new Error('Ocorreu um erro na Orelo')
  await view.webContents.loadURL(`https://orelo.cc/podcast/${id}/metricas`)
  await sleep(2000)
  if (view.webContents.getURL().includes('error')) throw new Error('ID da Orelo inválido')
  return view
}

const startScraping = (view: BrowserView): void => {
  setInterval(async () => {
    view.webContents.reload()
    await sleep(5000)
    view.webContents.executeJavaScript(`
      const cards = [...document.querySelectorAll('.MuiCard-root')]
      const [contributors, value] = cards.filter(card =>
        card.children[0].textContent.toLowerCase().includes('apoi')).map(card =>
        card.children[1].textContent)
      window.oreloApi.sendData({contributors, value})
    `)
  }, 10000)
}

export const scrapOrelo = async (id: string): Promise<void> => {
  const view = await checkErrors(id)
  startScraping(view)
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
      preload: join(__dirname, '../preload/external.js'),
      sandbox: false
    }
  })

  const view = new BrowserView({
    webPreferences: {
      preload: join(__dirname, '../preload/orelo.js')
    }
  })
  oreloWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 40, width: 900, height: 630 })
  view.setAutoResize({ width: true, height: true })
  await view.webContents.loadURL('https://orelo.cc/')

  oreloWindow.on('ready-to-show', async () => {
    if (oreloWindow) oreloWindow.show()
  })

  oreloWindow.on('close', async () => {
    removeListeners()
    oreloWindow = undefined
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    oreloWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/external')
  } else {
    oreloWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  removeListeners = initializeWindowHandler(oreloWindow, 'ORELO')
}
