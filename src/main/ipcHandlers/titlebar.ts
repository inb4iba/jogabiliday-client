import { BrowserWindow, ipcMain } from 'electron'
import { WindowTitle } from '../../types/types'

export const initializeTitlebarHandler = (window: BrowserWindow, title: WindowTitle): void => {
  ipcMain.on('minimize_window', (e, data) => {
    if (title === data) window.minimize()
  })
  ipcMain.on('maximize_window', (e, data) => {
    if (title === data) window.maximize()
  })
  ipcMain.on('restore_window', (e, data) => {
    if (title === data) window.restore()
  })
  ipcMain.on('close_window', (e, data) => {
    if (title === data) window.close()
  })

  window.on('maximize', () => {
    window.webContents.send('resize_window')
  })
  window.on('unmaximize', () => {
    window.webContents.send('resize_window')
  })
}
