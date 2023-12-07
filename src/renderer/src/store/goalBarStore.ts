import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  bgColor: string
  fillColor: string
  width: number
  height: number
  border: number
  paddingH: number
  paddingV: number
  textSize: number
  valueSize: number
  textWeight: number
  totalValue: number
  goalValue: number
  previousValue: number
}

type Action = {
  updateBgColor: (color: string) => void
  updateFillColor: (color: string) => void
  updateWidth: (width: number) => void
  updateHeight: (height: number) => void
  updateBorder: (border: number) => void
  updatePaddingH: (padding: number) => void
  updatePaddingV: (padding: number) => void
  updateTextSize: (textSize: number) => void
  updateValueSize: (valueSize: number) => void
  updateTextWeight: (textWeight: number) => void
  updateTotalValue: (value: number) => void
  updateGoalValue: (value: number) => void
  updatePreviousValue: (value: number) => void
}

export const useGoalBarStore = create<State & Action>()(
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
      totalValue: 950,
      goalValue: 1000,
      previousValue: 0,
      updateBgColor: (color): void => set(() => ({ bgColor: color })),
      updateFillColor: (color): void => set(() => ({ fillColor: color })),
      updateBorder: (border): void => set(() => ({ border })),
      updateHeight: (height): void => set(() => ({ height })),
      updatePaddingH: (padding): void => set(() => ({ paddingH: padding })),
      updatePaddingV: (padding): void => set(() => ({ paddingV: padding })),
      updateTextSize: (textSize): void => set(() => ({ textSize })),
      updateTextWeight: (textWeight): void => set(() => ({ textWeight })),
      updateValueSize: (valueSize): void => set(() => ({ valueSize })),
      updateWidth: (width): void => set(() => ({ width })),
      updateTotalValue: (value): void => set((state) => ({ totalValue: state.totalValue + value })),
      updateGoalValue: (value): void => set(() => ({ goalValue: value })),
      updatePreviousValue: (value): void => set(() => ({ previousValue: value }))
    }),
    { name: 'jogabiliday_goal_bar' }
  )
)
