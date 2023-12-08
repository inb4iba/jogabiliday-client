import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  oldValue: number
}

type Action = {
  setOldValue: (value: number) => void
}

export const useTipaStore = create<State & Action>(
  persistNSync(
    (set) => ({
      oldValue: 0,
      setOldValue: (value): void => set(() => ({ oldValue: value }))
    }),
    { name: 'jogabiliday_orelo' }
  )
)
