import { contextBridge, ipcRenderer } from 'electron'

try {
  contextBridge.exposeInMainWorld('oreloApi', {
    sendData: (data): void => ipcRenderer.send('orelo_data', data)
  })
} catch (error) {
  console.error(error)
}
