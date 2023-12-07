export type WindowTitle = 'MAIN' | 'ORELO' | 'TIPA'

type CustomizationData = {
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

type WindowApi = {
  minimize: () => void
  maximize: () => void
  restore: () => void
  close: () => void
  onResizeWindow: (callback: () => void) => void
  getTitle: () => Promise<string>
}
type OreloApi = {
  sendData: (data: OreloData) => void
}

type Data = {
  type: 'data' | 'error'
  data?: {
    message: string
  }
}

type ValueData = {
  from: 'ORELO' | 'TIPA' | 'MANUAL'
  supporters?: string
  value: string
}
