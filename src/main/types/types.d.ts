export type WindowTitle = 'MAIN' | 'ORELO' | 'TIPA'

export type WindowApi = {
  minimize: () => void
  maximize: () => void
  restore: () => void
  close: () => void
  onResizeWindow: (callback: () => void) => void
  getTitle: () => Promise<string>
}
export type OreloApi = {
  sendData: (data: OreloData) => void
}

export type Data = {
  type: 'data' | 'error'
  data?: {
    message: string
  }
}

type OreloData = {
  contributors: string
  value: string
}
