import { JSX, useEffect, useRef, useState } from 'react'
import { Input } from '../Input'
import { useGoalsListStore } from '@renderer/store/goalsListStore'

export const GoalListConfig = (): JSX.Element => {
  const nextGoalsAmountRef = useRef<HTMLInputElement>(null)
  const listSizeRef = useRef<HTMLInputElement>(null)
  const [timeoutHandler, setTimeoutHandler] = useState<ReturnType<typeof setTimeout> | null>(null)

  const [listSize, updateListSize, nextGoalsAmount, updateNextGoalsAmount] = useGoalsListStore(
    (state) => [
      state.listSize,
      state.updateListSize,
      state.nextGoalsAmount,
      state.updateNextGoalsAmount
    ]
  )

  useEffect(() => {
    window.mainApi.customizeList({ listSize, nextGoalsAmount })
  }, [listSize, nextGoalsAmount])

  const customizeList = (): void => {
    if (timeoutHandler) clearTimeout(timeoutHandler)
    const handler = setTimeout(() => {
      if (nextGoalsAmountRef.current && !isNaN(+nextGoalsAmountRef.current.value)) {
        updateNextGoalsAmount(+nextGoalsAmountRef.current.value)
      }
      if (listSizeRef.current && !isNaN(+listSizeRef.current.value)) {
        updateListSize(+listSizeRef.current.value)
      }
    }, 700)
    setTimeoutHandler(handler)
  }

  return (
    <>
      <div className="flex justify-between gap-2">
        <Input
          type="text"
          label="Tamanho Lista"
          onChange={customizeList}
          _ref={listSizeRef}
          value={listSize + ''}
        />
        <Input
          type="text"
          label="Número de próximas metas"
          onChange={customizeList}
          _ref={nextGoalsAmountRef}
          value={nextGoalsAmount + ''}
        />
      </div>
    </>
  )
}
