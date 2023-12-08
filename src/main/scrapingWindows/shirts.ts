import { BrowserView, BrowserWindow } from 'electron'
import { join } from 'path'
import { initializeWindowHandler } from '../ipcHandlers/window'
import { is } from '@electron-toolkit/utils'
import { sendMessage } from '../server'

let shirtsWindow: BrowserWindow | undefined
let removeListeners: () => void | undefined
let intervalHandler: ReturnType<typeof setInterval>
// const links = process.env.SHIRTS_LINKS?.split(',')
const links =
  'https://asbaratas.com.br/loja/monitor-vendas/?tk=99b450da1792d365000506ccddfd333b&mode=live&start=2023-12-01&end=2023-12-11&pid=81062,https://asbaratas.com.br/loja/monitor-vendas/?tk=99b450da1792d365000506ccddfd333b&mode=live&start=2023-12-01&end=2023-12-11&pid=75530,https://asbaratas.com.br/loja/monitor-vendas/?tk=99b450da1792d365000506ccddfd333b&mode=live&start=2023-12-01&end=2023-12-11&pid=85324,https://asbaratas.com.br/loja/monitor-vendas/?tk=99b450da1792d365000506ccddfd333b&mode=live&start=2023-12-01&end=2023-12-11&pid=76847'.split(
    ','
  )

export const openShirts = (): void => {
  if (!shirtsWindow) createWindow()
}

export const closeShirts = (): void => {
  if (shirtsWindow) shirtsWindow.close()
}

export const showShirts = (): void => {
  if (shirtsWindow) shirtsWindow.show()
}

export const hideShirts = (): void => {
  if (shirtsWindow) shirtsWindow.hide()
}

export const checkShirtsErrors = async (): Promise<BrowserView> => {
  if (!shirtsWindow) throw new Error('Camisetas: Janela não está aberta')
  const view = shirtsWindow.getBrowserView()
  if (!view) throw new Error('Orelo: Ocorreu um erro ao carregar a página')
  return view
}

export const startShirtsScraping = (): void => {
  if (!shirtsWindow) return
  const view = shirtsWindow.getBrowserView()
  if (!view) return
  intervalHandler = setInterval(async () => {
    let shirts = 0
    if (links)
      for (let i = 0; i < links.length; i++) {
        view.webContents.loadURL(links[i])
        const res = await view.webContents.executeJavaScript(`
            document.querySelector('table').children[0].children[2].children[1].textContent
        `)
        shirts += +res
      }
    sendMessage('VALUE', { from: 'SHIRTS', value: shirts + '' } as ValueData)
  }, 60000)
}

export const stopShirtsScraping = (): void => {
  clearInterval(intervalHandler)
}

const createWindow = async (): Promise<void> => {
  shirtsWindow = new BrowserWindow({
    title: 'Camisetas',
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/shirts.js'),
      sandbox: false
    }
  })

  const view = new BrowserView()
  shirtsWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 40, width: 900, height: 630 })
  view.setAutoResize({ width: true, height: true })
  if (links) await view.webContents.loadURL(links[0])

  shirtsWindow.on('ready-to-show', async () => {
    if (shirtsWindow) {
      shirtsWindow.show()
    }
  })

  shirtsWindow.on('close', async () => {
    removeListeners()
    shirtsWindow = undefined
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    shirtsWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/external')
  } else {
    shirtsWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  removeListeners = initializeWindowHandler(shirtsWindow, 'SHIRTS')
}
