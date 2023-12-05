import { ipcMain } from 'electron'
import { closeOrelo, hideOrelo, openOrelo, showOrelo } from '../scrapingWindows/orelo'
import { startServer, stopServer } from '..'
import { Data, OreloData, TipaData } from '../types/types'
import { closeTipa, hideTipa, openTipa, showTipa } from '../scrapingWindows/tipa'

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
  ipcMain.on('open_tipa', () => {
    openTipa()
  })
  ipcMain.on('close_tipa', () => {
    closeTipa()
  })
  ipcMain.on('show_tipa', () => {
    showTipa()
  })
  ipcMain.on('hide_tipa', () => {
    hideTipa()
  })
  ipcMain.handle('start_server', async (_e, data): Promise<Data> => {
    return startServer(data['oreloId'])
  })
  ipcMain.handle('stop_server', async (): Promise<Data> => {
    return stopServer()
  })
  ipcMain.on('orelo_data', (_e, data: OreloData) =>
    console.log('Orelo: ', 'apoiadores', data.contributors, 'valor', data.value)
  )
  ipcMain.on('tipa_data', (_e, data: TipaData) => console.log('Tipa Ai: ', 'valor', data.value))
}
