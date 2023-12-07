import { create } from 'zustand'

type State = {
  supporters: number
}

type Action = {
  addSupporter: (value: number) => void
  removeSupporter: (value: number) => void
}

export const useSupportersStore = create<State & Action>((set) => ({
  supporters: 0,
  addSupporter: (value): void =>
    set((state) => ({
      supporters: state.supporters + value
    })),
  removeSupporter: (value): void =>
    set((state) => ({
      supporters: state.supporters - value
    }))
}))
