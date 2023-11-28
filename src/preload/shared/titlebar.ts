import { IpcRenderer, ipcRenderer } from 'electron'

export const titlebarApi = {
  minimize: (): void => ipcRenderer.send('minimize_window'),
  maximize: (): void => ipcRenderer.send('maximize_window'),
  restore: (): void => ipcRenderer.send('restore_window'),
  close: (): void => ipcRenderer.send('close_window'),
  onResizeWindow: (callback: () => void): IpcRenderer => ipcRenderer.on('resize_window', callback)
}
