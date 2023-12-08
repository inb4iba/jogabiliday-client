import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  supporters: number
  oldSupporters: number
  fontSize: number
  fontWeight: number
  showLabel: boolean
  color: string
}

type Action = {
  updateSupporters: (value: number) => void
  updateOldSupporters: (value: number) => void
  updateFontSize: (value: number) => void
  updateFontWeight: (value: number) => void
  updateShowLabel: (value: boolean) => void
  updateColor: (value: string) => void
}

export const useSupportersStore = create<State & Action>(
  persistNSync(
    (set) => ({
      supporters: 0,
      oldSupporters: 0,
      fontSize: 36,
      fontWeight: 400,
      showLabel: true,
      color: '#42FFEB',
      updateSupporters: (value): void =>
        set((state) => ({
          supporters: state.supporters + value
        })),
      updateOldSupporters: (value): void =>
        set(() => ({
          oldSupporters: value
        })),
      updateFontSize: (value): void =>
        set(() => ({
          fontSize: value
        })),
      updateFontWeight: (value): void =>
        set(() => ({
          fontWeight: value
        })),
      updateShowLabel: (value): void =>
        set(() => ({
          showLabel: value
        })),
      updateColor: (value): void =>
        set(() => ({
          color: value
        }))
    }),
    {
      name: 'jogabiliday_supporters'
    }
  )
)
