import { ipcMain } from 'electron'
import { closeOrelo, hideOrelo, openOrelo, showOrelo } from '../scrapingWindows/orelo'
import { startServer, stopServer } from '..'
import { CustomizationData, Data, ValueData } from '../types/types'
import { closeTipa, hideTipa, openTipa, showTipa } from '../scrapingWindows/tipa'
import { sendMessage } from '../server'

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
  ipcMain.on('orelo_data', (_e, data: ValueData) => {
    sendMessage('VALUE', data)
  })
  ipcMain.on('tipa_data', (_e, data: ValueData) => {
    sendMessage('VALUE', data)
  })
  ipcMain.on('customize_bar', (_e, data: CustomizationData) => {
    sendMessage('CUSTOMIZATION', data)
  })
  ipcMain.on('update_shirts', (_e, data: number) => {
    sendMessage('SHIRTS', data)
  })
  ipcMain.on('update_supporters', (_e, data: number) => {
    sendMessage('SUPPORTERS', data)
  })
  ipcMain.on('update_total_value', (_e, data: ValueData) => {
    sendMessage('VALUE', data)
  })
}
