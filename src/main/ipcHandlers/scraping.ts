import { ipcMain } from 'electron'
import { openOrelo } from '../scrapingWindows/orelo'

export const initializeScrapingHandler = (): void => {
  ipcMain.on('open_orelo', () => {
    openOrelo()
  })
}
