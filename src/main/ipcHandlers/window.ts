import { BrowserWindow, ipcMain } from 'electron'
import { WindowTitle } from '../../types/types'

export const initializeWindowHandler = (
  window: BrowserWindow,
  title: WindowTitle
): (() => void) => {
  ipcMain.on('minimize_window', (_e, data) => {
    if (title === data) window.minimize()
  })
  ipcMain.on('maximize_window', (_e, data) => {
    if (title === data) window.maximize()
  })
  ipcMain.on('restore_window', (_e, data) => {
    if (title === data) window.restore()
  })
  ipcMain.on('close_window', (_e, data) => {
    if (title === data) window.close()
  })
  ipcMain.on('hide_window', (_e, data) => {
    if (title === data) window.hide()
  })
  ipcMain.on('show_window', (_e, data) => {
    if (title === data) window.show()
  })

  window.on('maximize', () => {
    window.webContents.send('resize_window')
  })
  window.on('unmaximize', () => {
    window.webContents.send('resize_window')
  })

  return (): void => {
    window.removeAllListeners()
  }
}
