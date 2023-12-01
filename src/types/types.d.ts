export type WindowTitle = 'MAIN' | 'ORELO' | 'TIPA'

export type TitlebarApi = {
  minimize: () => void
  maximize: () => void
  restore: () => void
  close: () => void
  onResizeWindow: (callback: () => void) => void
}
