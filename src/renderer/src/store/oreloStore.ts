import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  id?: string
  oldValue: number
  oldSupporters: number
}

type Action = {
  setId: (id: string) => void
  setOldValue: (value: number) => void
  setOldSupporters: (value: number) => void
}

export const useOreloStore = create<State & Action>(
  persistNSync(
    (set) => ({
      id: undefined,
      oldValue: 0,
      oldSupporters: 0,
      setId: (id): void => set(() => ({ id })),
      setOldValue: (value): void => set(() => ({ oldValue: value })),
      setOldSupporters: (value): void => set(() => ({ oldSupporters: value }))
    }),
    { name: 'jogabiliday_orelo' }
  )
)
