import { IpcRenderer, ipcRenderer } from 'electron'
import { TitlebarApi, WindowTitle } from '../../types/types'

export const titlebarApi = (title: WindowTitle): TitlebarApi => {
  return {
    minimize: (): void => ipcRenderer.send('minimize_window', title),
    maximize: (): void => ipcRenderer.send('maximize_window', title),
    restore: (): void => ipcRenderer.send('restore_window', title),
    close: (): void => ipcRenderer.send('close_window', title),
    onResizeWindow: (callback: () => void): IpcRenderer => ipcRenderer.on('resize_window', callback)
  }
}
