type Data = {
  type: 'data' | 'error'
  data?: {
    message: string
  }
}

type CustomizationData = {
  bgColor: string
  fillColor: string
  width: number
  height: number
  border: number
  paddingH: number
  paddingV: number
  textSize: number
  valueSize: number
  textWeight: number
}

interface Window {
  windowApi: {
    minimize: () => void
    maximize: () => void
    restore: () => void
    close: () => void
    onResizeWindow: (callback: () => void) => void
    getTitle: () => Promise<string>
  }

  mainApi: {
    openOrelo: () => void
    closeOrelo: () => void
    showOrelo: () => void
    hideOrelo: () => void
    onOreloHide: (callback: () => void) => void
    openTipa: () => void
    closeTipa: () => void
    showTipa: () => void
    hideTipa: () => void
    onTipaHide: (callback: () => void) => void
    startServer: ({ oreloId: string }) => Promise<Data>
    stopServer: () => Promise<Data>
    customizeBar: (data: CustomizationData) => void
  }
}
