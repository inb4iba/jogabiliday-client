import { JSX, useRef } from 'react'
import { Button } from './Button'
import { LuTrash2 } from 'react-icons/lu'

type Props = {
  goal: Goal
  onUpdate: (goal: Goal) => void
  onDelete: (id: number) => void
}

export const Goal = ({ goal, onUpdate, onDelete }: Props): JSX.Element => {
  const titleRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLInputElement>(null)

  const saveGoal = (): void => {
    onUpdate({
      id: goal.id,
      title: titleRef.current?.value,
      value: valueRef.current?.value ? +valueRef.current.value : undefined
    })
  }

  const deleteGoal = (): void => {
    onDelete(goal.id)
  }

  return (
    <div className="flex gap-2">
      <input
        className="flex-grow p-2 rounded-md bg-zinc-900"
        type="text"
        placeholder="Título"
        value={goal.title}
        onChange={saveGoal}
        ref={titleRef}
      />
      <input
        className="w-1/5 p-2 rounded-md bg-zinc-900"
        type="text"
        placeholder="Valor"
        value={goal.value}
        onChange={saveGoal}
        ref={valueRef}
      />
      <Button className="hover:bg-red-600" onClick={deleteGoal}>
        <LuTrash2 />
      </Button>
    </div>
  )
}
