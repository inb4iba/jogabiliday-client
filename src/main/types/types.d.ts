export type WindowTitle = 'MAIN' | 'ORELO' | 'TIPA'

export type WindowApi = {
  minimize: () => void
  maximize: () => void
  restore: () => void
  close: () => void
  onResizeWindow: (callback: () => void) => void
}