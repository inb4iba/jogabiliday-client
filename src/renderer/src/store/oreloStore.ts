import { create } from 'zustand'

type State = {
  id?: string
}

type Action = {
  setId: (id: string) => void
}

export const useOreloStore = create<State & Action>((set) => ({
  id: undefined,
  setId: (id): void => set(() => ({ id }))
}))
