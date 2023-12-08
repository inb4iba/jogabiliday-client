import { IpcRenderer, ipcRenderer } from 'electron'
import { CustomizationListData, Data, ValueData } from '../../main/types/types'

export const mainApi = {
  openOrelo: (): void => ipcRenderer.send('open_orelo'),
  closeOrelo: (): void => ipcRenderer.send('close_orelo'),
  showOrelo: (): void => ipcRenderer.send('show_orelo'),
  hideOrelo: (): void => ipcRenderer.send('hide_orelo'),
  onOreloHide: (callback: () => void): IpcRenderer => {
    return ipcRenderer.on('on_orelo_hide', callback)
  },
  openTipa: (): void => ipcRenderer.send('open_tipa'),
  closeTipa: (): void => ipcRenderer.send('close_tipa'),
  showTipa: (): void => ipcRenderer.send('show_tipa'),
  hideTipa: (): void => ipcRenderer.send('hide_tipa'),
  onTipaHide: (callback: () => void): IpcRenderer => {
    return ipcRenderer.on('on_tipa_hide', callback)
  },
  openShirts: (): void => ipcRenderer.send('open_shirts'),
  closeShirts: (): void => ipcRenderer.send('close_shirts'),
  showShirts: (): void => ipcRenderer.send('show_shirts'),
  hideShirts: (): void => ipcRenderer.send('hide_shirts'),
  onShirtsHide: (callback: () => void): IpcRenderer => {
    return ipcRenderer.on('on_shirts_hide', callback)
  },
  startServer: (data: { oreloId: string }): Promise<Data> =>
    ipcRenderer.invoke('start_server', data),
  stopServer: (): Promise<string> => ipcRenderer.invoke('stop_server'),
  customizeBar: (data: CustomizationBarData): void => ipcRenderer.send('customize_bar', data),
  customizeGenericBar: (data: CustomizationGenericBarData): void =>
    ipcRenderer.send('customize_generic_bar', data),
  customizeList: (data: CustomizationListData): void => ipcRenderer.send('customize_list', data),
  customizeShirt: (data: CustomizationShirtData): void =>
    ipcRenderer.send('customize_shirts', data),
  customizeSupporters: (data: CustomizationSupportersData): void =>
    ipcRenderer.send('customize_supporters', data),
  updateShirts: (data: number): void => {
    ipcRenderer.send('update_shirts', data)
  },
  updateSupporters: (data: number): void => {
    ipcRenderer.send('update_supporters', data)
  },
  updateTotalValue: (data: ValueData): void => {
    ipcRenderer.send('update_total_value', data)
  },
  updateGoals: (data: Goal[]): void => {
    ipcRenderer.send('update_goals', data)
  },
  updateSelectedSites: (data: { orelo: boolean; tipa: boolean; shirts: boolean }): void => {
    ipcRenderer.send('update_selected_sites', data)
  },
  resetCache: (): void => {
    ipcRenderer.send('reset_cache')
  }
}
