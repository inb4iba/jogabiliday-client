import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  shirts: number
  oldShirts: number
  fontSize: number
  fontWeight: number
  showLabel: boolean
  color: string
  goal: number
}

type Action = {
  updateShirts: (value: number) => void
  updateOldShirts: (value: number) => void
  updateFontSize: (value: number) => void
  updateFontWeight: (value: number) => void
  updateShowLabel: (value: boolean) => void
  updateColor: (value: string) => void
  updateGoal: (value: number) => void
}

export const useShirtsStore = create<State & Action>(
  persistNSync(
    (set) => ({
      shirts: 0,
      oldShirts: 0,
      fontSize: 36,
      fontWeight: 400,
      showLabel: true,
      color: '#42FFEB',
      goal: 20,
      updateShirts: (value): void =>
        set((state) => ({
          shirts: state.shirts + value
        })),
      updateOldShirts: (value): void =>
        set(() => ({
          oldShirts: value
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
        })),
      updateGoal: (value): void =>
        set(() => ({
          goal: value
        }))
    }),
    { name: 'jogabiliday_shirts' }
  )
)
