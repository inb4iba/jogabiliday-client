import { BrowserWindow, ipcMain } from 'electron'

export const initializeTitlebarHandler = (window: BrowserWindow): void => {
  ipcMain.on('minimize_window', () => {
    window.minimize()
  })
  ipcMain.on('maximize_window', () => {
    window.maximize()
  })
  ipcMain.on('restore_window', () => {
    window.restore()
  })
  ipcMain.on('close_window', () => window.close())

  window.on('maximize', () => {
    window.webContents.send('resize_window')
  })
  window.on('unmaximize', () => {
    window.webContents.send('resize_window')
  })
}
