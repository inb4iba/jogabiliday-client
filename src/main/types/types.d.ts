export type WindowTitle = 'MAIN' | 'ORELO' | 'TIPA'

export type CustomizationData = {
  bgColor: string
  fillColor: string
  width: number
  height: number
  border: number
  padding: number
  textSize: number
  valueSize: number
  textWeight: number
}

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
  supporters: string
  value: string
}

type TipaData = {
  value: string
}
