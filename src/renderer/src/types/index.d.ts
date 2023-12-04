type Data = {
  type: 'data' | 'error'
  data?: {
    message: string
  }
}

interface Window {
  windowApi: {
    minimize: () => void
    maximize: () => void
    restore: () => void
    close: () => void
    onResizeWindow: (callback: () => void) => void
  }

  mainApi: {
    openOrelo: () => void
    closeOrelo: () => void
    showOrelo: () => void
    hideOrelo: () => void
    onOreloHide: (callback: () => void) => void
    startServer: ({ oreloId: string }) => Promise<Data>
    stopServer: () => Promise<string>
  }
}
