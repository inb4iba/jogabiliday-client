interface Window {
  titlebarApi: {
    minimize: () => void
    maximize: () => void
    restore: () => void
    close: () => void
    onResizeWindow: (callback: () => void) => void
  }
}
