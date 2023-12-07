import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  shirts: number
}

type Action = {
  updateShirts: (value: number) => void
}

export const useShirtsStore = create<State & Action>(
  persistNSync(
    (set) => ({
      shirts: 0,
      updateShirts: (value): void =>
        set((state) => ({
          shirts: state.shirts + value
        }))
    }),
    { name: 'jogabiliday_shirts' }
  )
)
