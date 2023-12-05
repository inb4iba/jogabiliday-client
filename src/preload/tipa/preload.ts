import { contextBridge } from 'electron'
import { windowApi } from '../shared/titlebar'

try {
  contextBridge.exposeInMainWorld('windowApi', windowApi('TIPA'))
} catch (error) {
  console.error(error)
}
