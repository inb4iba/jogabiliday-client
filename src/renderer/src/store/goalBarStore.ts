import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

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
  immer((set) => ({
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
    updateBgColor: (color): void =>
      set((state) => {
        state.bgColor = color
      }),
    updateFillColor: (color): void =>
      set((state) => {
        state.fillColor = color
      }),
    updateBorder: (border): void =>
      set((state) => {
        state.border = border
      }),
    updateHeight: (height): void =>
      set((state) => {
        state.height = height
      }),
    updatePaddingH: (padding): void =>
      set((state) => {
        state.paddingH = padding
      }),
    updatePaddingV: (padding): void =>
      set((state) => {
        state.paddingV = padding
      }),
    updateTextSize: (textSize): void =>
      set((state) => {
        state.textSize = textSize
      }),
    updateTextWeight: (textWeight): void =>
      set((state) => {
        state.textWeight = textWeight
      }),
    updateValueSize: (valueSize): void =>
      set((state) => {
        state.valueSize = valueSize
      }),
    updateWidth: (width): void =>
      set((state) => {
        state.width = width
      }),
    updateTotalValue: (value): void =>
      set((state) => {
        state.totalValue += value
      }),
    updateGoalValue: (value): void =>
      set((state) => {
        state.goalValue = value
      }),
    updatePreviousValue: (value): void =>
      set((state) => {
        state.previousValue = value
      })
  }))
)
