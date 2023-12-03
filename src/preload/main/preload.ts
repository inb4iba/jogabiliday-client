import { contextBridge } from 'electron'
import { windowApi } from '../shared/titlebar'
import { scrapingApi } from './scraping'

try {
  contextBridge.exposeInMainWorld('titlebarApi', windowApi('MAIN'))
  contextBridge.exposeInMainWorld('scrapingApi', scrapingApi)
} catch (error) {
  console.error(error)
}
