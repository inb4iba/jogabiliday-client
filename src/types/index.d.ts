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
  }
}
