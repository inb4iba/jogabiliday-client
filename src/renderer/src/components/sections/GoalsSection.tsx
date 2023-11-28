import { Button } from '../Button'
import { JSX } from 'react'
import { Goal } from '../Goal'
import { useGoalsStore } from '@renderer/store/goalsStore'

export const GoalsSection = (): JSX.Element => {
  const goals = useGoalsStore((state) => state.goals)
  const addGoal = useGoalsStore((state) => state.addGoal)
  const updateGoal = useGoalsStore((state) => state.updateGoal)

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
