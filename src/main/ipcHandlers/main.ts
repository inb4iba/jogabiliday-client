import { ipcMain } from 'electron'
import { openOrelo } from '../scrapingWindows/orelo'

export const initializeMainHandler = (): void => {
  ipcMain.on('open_orelo', () => {
    openOrelo()
  })
}
