import { ipcRenderer } from 'electron'

export const mainApi = {
  openOrelo: (): void => ipcRenderer.send('open_orelo')
}
