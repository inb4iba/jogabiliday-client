import { contextBridge } from 'electron'
import { windowApi } from '../shared/titlebar'

try {
  contextBridge.exposeInMainWorld('windowApi', windowApi('SHIRTS'))
} catch (error) {
  console.error(error)
}
