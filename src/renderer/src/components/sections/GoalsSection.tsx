import { Button } from '../Button'
import { JSX, useState } from 'react'
import { Goal } from '../Goal'

export const GoalsSection = (): JSX.Element => {
  const [goals, setGoals] = useState<Goal[]>([])

  const addGoal = (): void => {
    setGoals([...goals, { id: goals.length }])
  }

  const updateGoal = (goal: Goal): void => {
    setGoals(
      goals.map((g, idx) => {
        if (idx !== goal.id) return g
        return goal
      })
    )
  }

  return (
    <section className="flex flex-col gap-2">
      {goals.map((goal, idx) => (
        <Goal key={idx} goal={goal} onUpdate={updateGoal} />
      ))}
      <Button onClick={addGoal}>
        <span>Adicionar Meta</span>
      </Button>
    </section>
  )
}
