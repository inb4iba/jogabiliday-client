import { ipcMain } from 'electron'
import { closeOrelo, hideOrelo, openOrelo, showOrelo } from '../scrapingWindows/orelo'
import { startServer, stopServer } from '..'

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
  ipcMain.handle('start_server', async (): Promise<string> => {
    return startServer()
  })
  ipcMain.handle('stop_server', async (): Promise<string> => {
    return stopServer()
  })
}
