import { JSX, useEffect, useState } from 'react'
import { GoalItem } from './GoalItem'
import { useGoalsStore } from '@renderer/store/goalsStore'
import { useGoalsListStore } from '@renderer/store/goalsListStore'

export const GoalsList = (): JSX.Element => {
  const [listSize, setListSize, nextGoalsAmount, setNextGoalsAmount, actualItemIdx] =
    useGoalsListStore((state) => [
      state.listSize,
      state.updateListSize,
      state.nextGoalsAmount,
      state.updateNextGoalsAmount,
      state.actualItemIdx
    ])
  const [list, setList] = useState<Goal[]>()
  const goals = useGoalsStore((state) => state.goals)

  useEffect(() => {
    if (goals.length > 0) {
      const diff = listSize - nextGoalsAmount
      if (actualItemIdx - diff < 0) createList(0)
      else if (actualItemIdx + nextGoalsAmount >= goals.length) createList(goals.length - listSize)
      else createList(actualItemIdx - diff)
    }
  }, [goals, actualItemIdx])

  const createList = (from: number): void => {
    const _list: Goal[] = []
    for (let i = from; i < from + listSize; i++) {
      _list.push(goals[i])
    }
    setList(_list)
  }

  return (
    <section className="absolute flex flex-col justify-end w-1/4 gap-1 overflow-hidden right-32 top-1/2">
      {list ? (
        list.map((goal) => {
          if (goal.title && goal.value)
            return (
              <GoalItem
                text={goal.title}
                value={goal.value}
                complete={goal.id < actualItemIdx}
                key={goal.id}
              />
            )
          return <></>
        })
      ) : (
        <></>
      )}
    </section>
  )
}
