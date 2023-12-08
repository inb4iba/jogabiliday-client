import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  nextGoalsAmount: number
  listSize: number
  actualItemIdx: number
}

type Action = {
  updateNextGoalsAmount: (value: number) => void
  updateListSize: (value: number) => void
  updateActualItemIdx: (idx: number) => void
}

export const useGoalsListStore = create<State & Action>(
  persistNSync(
    (set) => ({
      nextGoalsAmount: 3,
      listSize: 8,
      actualItemIdx: 0,
      updateNextGoalsAmount: (value): void =>
        set(() => ({
          nextGoalsAmount: value
        })),
      updateListSize: (value): void =>
        set(() => ({
          listSize: value
        })),
      updateActualItemIdx: (idx): void =>
        set(() => ({
          actualItemIdx: idx
        }))
    }),
    { name: 'jogabiliday_goals_list' }
  )
)
