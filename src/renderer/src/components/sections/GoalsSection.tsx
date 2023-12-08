import { Button } from '../Button'
import { JSX, useEffect } from 'react'
import { Goal } from '../Goal'
import { useGoalsStore } from '@renderer/store/goalsStore'

export const GoalsSection = (): JSX.Element => {
  const goals = useGoalsStore((state) => state.goals)
  const addGoal = useGoalsStore((state) => state.addGoal)
  const updateGoal = useGoalsStore((state) => state.updateGoal)
  const deleteGoal = useGoalsStore((state) => state.deleteGoal)

  useEffect(() => {
    window.mainApi.updateGoals(goals)
  }, [goals])

  return (
    <section className="flex flex-col gap-2">
      {goals.map((goal) => (
        <Goal key={goal.id} goal={goal} onUpdate={updateGoal} onDelete={deleteGoal} />
      ))}
      <Button onClick={addGoal}>
        <span>Adicionar Meta</span>
      </Button>
    </section>
  )
}
