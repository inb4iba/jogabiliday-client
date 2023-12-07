import { create } from 'zustand'

type State = {
  supporters: number
}

type Action = {
  updateSupporters: (value: number) => void
}

export const useSupportersStore = create<State & Action>((set) => ({
  supporters: 0,
  updateSupporters: (value): void =>
    set((state) => ({
      supporters: state.supporters + value
    }))
}))
