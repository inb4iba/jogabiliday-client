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

const checkErrors = async (id: string): Promise<BrowserView> => {
  if (!tipaWindow) throw new Error('Janela da Tipa Ai não está aberta')
  if (!id) throw new Error('O ID da Tipa Ai precisa estar preenchido')
  const view = tipaWindow.getBrowserView()
  if (!view) throw new Error('Ocorreu um erro na Tipa Ai')
  // TODO update link to Tipa Ai
  //   await view.webContents.loadURL(`https://orelo.cc/podcast/${id}/metricas`)
  //   await sleep(2000)
  //   if (view.webContents.getURL().includes('error')) throw new Error('ID da Orelo inválido')
  return view
}

const startScraping = (view: BrowserView): void => {
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
  }, 10000)
}

export const scrapTipa = async (id: string): Promise<void> => {
  const view = await checkErrors(id)
  startScraping(view)
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
      preload: join(__dirname, '../preload/external.js'),
      sandbox: false
    }
  })

  const view = new BrowserView({
    webPreferences: {
      preload: join(__dirname, '../preload/tipa.js')
    }
  })
  tipaWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 40, width: 900, height: 630 })
  view.setAutoResize({ width: true, height: true })
  await view.webContents.loadURL('https://tipa.ai/')

  tipaWindow.on('ready-to-show', async () => {
    if (tipaWindow) tipaWindow.show()
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

  removeListeners = initializeWindowHandler(tipaWindow, 'ORELO')
}
