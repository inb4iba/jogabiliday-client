import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  id?: string
}

type Action = {
  setId: (id: string) => void
}

export const useOreloStore = create<State & Action>(
  persistNSync(
    (set) => ({
      id: undefined,
      setId: (id): void => set(() => ({ id }))
    }),
    { name: 'jogabiliday_orelo' }
  )
)
