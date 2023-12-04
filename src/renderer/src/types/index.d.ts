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
    startServer: () => Promise<string>
    stopServer: () => Promise<string>
  }
}
