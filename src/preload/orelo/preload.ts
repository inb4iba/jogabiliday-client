import { contextBridge } from 'electron'
import { windowApi } from '../shared/titlebar'

try {
  contextBridge.exposeInMainWorld('titlebarApi', windowApi('ORELO'))
} catch (error) {
  console.error(error)
}
