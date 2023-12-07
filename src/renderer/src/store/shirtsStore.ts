import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  shirts: number
  oldShirts: number
}

type Action = {
  updateShirts: (value: number) => void
  updateOldShirts: (value: number) => void
}

export const useShirtsStore = create<State & Action>(
  persistNSync(
    (set) => ({
      shirts: 0,
      oldShirts: 0,
      updateShirts: (value): void =>
        set((state) => ({
          shirts: state.shirts + value
        })),
      updateOldShirts: (value): void =>
        set(() => ({
          oldShirts: value
        }))
    }),
    { name: 'jogabiliday_shirts' }
  )
)
