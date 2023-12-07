import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  supporters: number
}

type Action = {
  updateSupporters: (value: number) => void
}

export const useSupportersStore = create<State & Action>(
  persistNSync(
    (set) => ({
      supporters: 0,
      updateSupporters: (value): void =>
        set((state) => ({
          supporters: state.supporters + value
        }))
    }),
    {
      name: 'jogabiliday_supporters'
    }
  )
)
