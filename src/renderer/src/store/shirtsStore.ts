import { create } from 'zustand'

type State = {
  shirts: number
}

type Action = {
  updateShirts: (value: number) => void
}

export const useShirtsStore = create<State & Action>((set) => ({
  shirts: 0,
  updateShirts: (value): void =>
    set((state) => ({
      shirts: state.shirts + value
    }))
}))
