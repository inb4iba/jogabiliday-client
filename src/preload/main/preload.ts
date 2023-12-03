import { contextBridge } from 'electron'
import { windowApi } from '../shared/titlebar'
import { mainApi } from './main'

try {
  contextBridge.exposeInMainWorld('titlebarApi', windowApi('MAIN'))
  contextBridge.exposeInMainWorld('mainApi', mainApi)
} catch (error) {
  console.error(error)
}
