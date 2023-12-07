import { IpcRenderer, ipcRenderer } from 'electron'
import { CustomizationData, Data, ValueData } from '../../main/types/types'

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
  startServer: (data: { oreloId: string }): Promise<Data> =>
    ipcRenderer.invoke('start_server', data),
  stopServer: (): Promise<string> => ipcRenderer.invoke('stop_server'),
  customizeBar: (data: CustomizationData): void => ipcRenderer.send('customize_bar', data),
  updateShirts: (data: number): void => {
    ipcRenderer.send('update_shirts', data)
  },
  updateSupporters: (data: number): void => {
    ipcRenderer.send('update_supporters', data)
  },
  updateTotalValue: (data: ValueData): void => {
    ipcRenderer.send('update_total_value', data)
  }
}
