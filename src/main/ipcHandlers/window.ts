import { BrowserWindow, ipcMain } from 'electron'
import { sendHideWindow } from '..'
import { WindowTitle } from '../types/types'

export const initializeWindowHandler = (
  window: BrowserWindow,
  title: WindowTitle
): (() => void) => {
  const minimize = (): void => window.minimize()
  const maximize = (): void => window.maximize()
  const restore = (): void => window.restore()
  const close = (): void => window.close()
  const show = (): void => window.show()
  const hide = (): void => {
    window.hide()
    sendHideWindow(title)
  }

  ipcMain.on(`minimize_window:${title}`, minimize)
  ipcMain.on(`maximize_window:${title}`, maximize)
  ipcMain.on(`restore_window:${title}`, restore)
  ipcMain.on(`close_window:${title}`, close)
  ipcMain.on(`hide_window:${title}`, hide)
  ipcMain.on(`show_window:${title}`, show)

  window.on('maximize', () => {
    window.webContents.send('resize_window')
  })
  window.on('unmaximize', () => {
    window.webContents.send('resize_window')
  })

  return (): void => {
    window.removeAllListeners()
    ipcMain.removeListener(`minimize_window:${title}`, minimize)
    ipcMain.removeListener(`maximize_window:${title}`, maximize)
    ipcMain.removeListener(`restore_window:${title}`, restore)
    ipcMain.removeListener(`close_window:${title}`, close)
    ipcMain.removeListener(`hide_window:${title}`, hide)
    ipcMain.removeListener(`show_window:${title}`, show)
  }
}
