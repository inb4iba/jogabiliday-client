import { contextBridge } from 'electron'
import { titlebarApi } from './titlebar'

try {
  contextBridge.exposeInMainWorld('titlebarApi', titlebarApi)
} catch (error) {
  console.error(error)
}
