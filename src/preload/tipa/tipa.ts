import { contextBridge, ipcRenderer } from 'electron'

try {
  contextBridge.exposeInMainWorld('tipaApi', {
    sendData: (data): void => ipcRenderer.send('tipa_data', data)
  })
} catch (error) {
  console.error(error)
}
