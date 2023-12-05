import { IpcRenderer, ipcRenderer } from 'electron'
import { WindowApi, WindowTitle } from '../../main/types/types'

export const windowApi = (title: WindowTitle): WindowApi => {
  return {
    minimize: (): void => ipcRenderer.send(`minimize_window:${title}`),
    maximize: (): void => ipcRenderer.send(`maximize_window:${title}`),
    restore: (): void => ipcRenderer.send(`restore_window:${title}`),
    close: (): void =>
      title === 'MAIN'
        ? ipcRenderer.send(`close_window:${title}`)
        : ipcRenderer.send(`hide_window:${title}`),
    onResizeWindow: (callback: () => void): IpcRenderer =>
      ipcRenderer.on('resize_window', callback),
    getTitle: (): Promise<string> => ipcRenderer.invoke(`get_window_title:${title}`)
  }
}
