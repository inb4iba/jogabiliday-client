import { Goal } from '@renderer/components/Goal'
import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type State = {
  goals: Goal[]
}

type Action = {
  addGoal: () => void
  updateGoal: (goal: Goal) => void
  deleteGoal: (id: number) => void
}

export const useGoalsStore = create<State & Action>()(
  persistNSync(
    (set) => ({
      goals: [],
      addGoal: (): void =>
        set((state) => {
          const goals: Goal[] = [...state.goals]
          goals.push({ id: state.goals.length })
          return { goals }
        }),
      updateGoal: (goal): void =>
        set((state) => {
          const goals: Goal[] = [...state.goals]
          return {
            goals: goals.map((g, idx) => {
              if (idx !== goal.id) return g
              return goal
            })
          }
        }),
      deleteGoal: (id): void =>
        set((state) => {
          const goals: Goal[] = [...state.goals]
          return { goals: goals.filter((g) => g.id !== id) }
        })
    }),
    { name: 'jogabiliday_goals' }
  )
)
