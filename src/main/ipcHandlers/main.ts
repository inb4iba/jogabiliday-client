import { ipcMain } from 'electron'
import { closeOrelo, hideOrelo, openOrelo, showOrelo } from '../scrapingWindows/orelo'
import { startServer, stopServer } from '..'
import { CustomizationListData, Data, ValueData } from '../types/types'
import { closeTipa, hideTipa, openTipa, showTipa } from '../scrapingWindows/tipa'
import { sendMessage } from '../server'
import { closeShirts, hideShirts, openShirts, showShirts } from '../scrapingWindows/shirts'

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
  ipcMain.on('open_shirts', () => {
    openShirts()
  })
  ipcMain.on('close_shirts', () => {
    closeShirts()
  })
  ipcMain.on('show_shirts', () => {
    showShirts()
  })
  ipcMain.on('hide_shirts', () => {
    hideShirts()
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
  ipcMain.on('customize_bar', (_e, data: CustomizationBarData) => {
    sendMessage('CUSTOMIZATION:BAR', data)
  })
  ipcMain.on('customize_generic_bar', (_e, data: CustomizationGenericBarData) => {
    sendMessage('CUSTOMIZATION:GENERIC_BAR', data)
  })
  ipcMain.on('customize_list', (_e, data: CustomizationListData) => {
    sendMessage('CUSTOMIZATION:LIST', data)
  })
  ipcMain.on('customize_shirts', (_e, data: CustomizationShirtData) => {
    sendMessage('CUSTOMIZATION:SHIRTS', data)
  })
  ipcMain.on('customize_supporters', (_e, data: CustomizationSupportersData) => {
    sendMessage('CUSTOMIZATION:SUPPORTERS', data)
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
  ipcMain.on('update_goals', (_e, data: Goal[]) => {
    sendMessage('GOALS', data)
  })
}
