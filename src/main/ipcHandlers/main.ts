import { ipcMain } from 'electron'
import { closeOrelo, hideOrelo, openOrelo, showOrelo } from '../scrapingWindows/orelo'

export const initializeMainHandler = (): void => {
  ipcMain.on('open_orelo', () => {
    openOrelo()
  })
  ipcMain.on('close_orelo', () => {
    closeOrelo()
  })
  ipcMain.on('show_orelo', () => {
    showOrelo()
  })
  ipcMain.on('hide_orelo', () => {
    hideOrelo()
  })
}
