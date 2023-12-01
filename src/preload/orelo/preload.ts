import { contextBridge } from 'electron'
import { titlebarApi } from '../shared/titlebar'

try {
  contextBridge.exposeInMainWorld('titlebarApi', titlebarApi('ORELO'))
} catch (error) {
  console.error(error)
}
