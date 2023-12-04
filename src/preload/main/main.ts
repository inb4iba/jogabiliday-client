import { IpcRenderer, ipcRenderer } from 'electron'

export const mainApi = {
  openOrelo: (): void => ipcRenderer.send('open_orelo'),
  closeOrelo: (): void => ipcRenderer.send('close_orelo'),
  showOrelo: (): void => ipcRenderer.send('show_orelo'),
  hideOrelo: (): void => ipcRenderer.send('hide_orelo'),
  onOreloHide: (callback: () => void): IpcRenderer => {
    return ipcRenderer.on('on_orelo_hide', callback)
  },
  startServer: (): Promise<string> => ipcRenderer.invoke('start_server'),
  stopServer: (): Promise<string> => ipcRenderer.invoke('stop_server')
}
