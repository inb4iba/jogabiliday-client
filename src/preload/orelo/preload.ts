import { contextBridge } from 'electron'
import { titlebarApi } from '../shared/titlebar'

try {
  contextBridge.exposeInMainWorld('titlebarApi', titlebarApi)
} catch (error) {
  console.error(error)
}
