import { contextBridge } from 'electron'
import { titlebarApi } from '../shared/titlebar'
import { scrapingApi } from './scraping'

try {
  contextBridge.exposeInMainWorld('titlebarApi', titlebarApi)
  contextBridge.exposeInMainWorld('scrapingApi', scrapingApi)
} catch (error) {
  console.error(error)
}
