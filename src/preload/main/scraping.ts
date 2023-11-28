import { ipcRenderer } from 'electron'

export const scrapingApi = {
  openOrelo: (): void => ipcRenderer.send('open_orelo')
}
