import { JSX, useRef } from 'react'

type Props = {
  goal: Goal
  onUpdate: (goal: Goal) => void
}

export type Goal = {
  id: number
  title?: string
  value?: number
}

export const Goal = ({ goal, onUpdate: save }: Props): JSX.Element => {
  const titleRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLInputElement>(null)

  const saveGoal = (): void => {
    save({
      id: goal.id,
      title: titleRef.current?.value,
      value: valueRef.current?.value ? +valueRef.current.value : undefined
    })
  }

  return (
    <div className="flex gap-2">
      <input
        className="flex-grow p-2 bg-zinc-900 rounded-md"
        type="text"
        placeholder="Título"
        value={goal.title}
        onChange={saveGoal}
        ref={titleRef}
      />
      <input
        className="w-1/5 p-2 bg-zinc-900 rounded-md"
        type="text"
        placeholder="Valor"
        value={goal.value}
        onChange={saveGoal}
        ref={valueRef}
      />
    </div>
  )
}
