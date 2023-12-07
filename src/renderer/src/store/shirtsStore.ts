import { create } from 'zustand'

type State = {
  shirts: number
}

type Action = {
  addShirt: (value: number) => void
  removeShirt: (value: number) => void
}

export const useShirtsStore = create<State & Action>((set) => ({
  shirts: 0,
  addShirt: (value): void =>
    set((state) => ({
      shirts: state.shirts + value
    })),
  removeShirt: (value): void =>
    set((state) => ({
      shirts: state.shirts - value
    }))
}))
