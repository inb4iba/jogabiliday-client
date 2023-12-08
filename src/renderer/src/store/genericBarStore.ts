import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  bgColor: string
  fillColor: string
  width: number
  height: number
  border: number
  paddingH: number
  valueSize: number
  textWeight: number
}

type Action = {
  updateBgColor: (color: string) => void
  updateFillColor: (color: string) => void
  updateWidth: (width: number) => void
  updateHeight: (height: number) => void
  updateBorder: (border: number) => void
  updatePaddingH: (padding: number) => void
  updateValueSize: (valueSize: number) => void
  updateTextWeight: (textWeight: number) => void
}

export const useGenericBarStore = create<State & Action>()(
  persistNSync(
    (set) => ({
      bgColor: '#261752',
      fillColor: '#42FFEB',
      border: 4,
      height: 60,
      paddingH: 8,
      paddingV: 8,
      textSize: 18,
      textWeight: 500,
      valueSize: 32,
      width: 400,
      totalValue: 0,
      goalValue: 0,
      previousValue: 0,
      updateBgColor: (color): void => set(() => ({ bgColor: color })),
      updateFillColor: (color): void => set(() => ({ fillColor: color })),
      updateBorder: (border): void => set(() => ({ border })),
      updateHeight: (height): void => set(() => ({ height })),
      updatePaddingH: (padding): void => set(() => ({ paddingH: padding })),
      updateTextWeight: (textWeight): void => set(() => ({ textWeight })),
      updateValueSize: (valueSize): void => set(() => ({ valueSize })),
      updateWidth: (width): void => set(() => ({ width }))
    }),
    { name: 'jogabiliday_generic_bar' }
  )
)
