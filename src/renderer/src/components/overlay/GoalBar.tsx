import { useGoalBarStore } from '@renderer/store/goalBarStore'
import { useGoalsStore } from '@renderer/store/goalsStore'
import { useEffect, useRef, useState } from 'react'

export const GoalBar = (): JSX.Element => {
  const totalValueRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLSpanElement>(null)
  const goalValueRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const darkDescriptionRef = useRef<HTMLSpanElement>(null)
  const darkValueRef = useRef<HTMLSpanElement>(null)

  const [actualGoal, setActualGoal] = useState<Goal>()
  const [previousGoal, setPreviousGoal] = useState<Goal>()

  const totalValue = useGoalBarStore((state) => state.totalValue)
  const [goalValue, updateGoalValue] = useGoalBarStore((state) => [
    state.goalValue,
    state.updateGoalValue
  ])
  const [previousValue, updatePreviousValue] = useGoalBarStore((state) => [
    state.previousValue,
    state.updatePreviousValue
  ])
  const width = useGoalBarStore((state) => state.width)
  const height = useGoalBarStore((state) => state.height)
  const border = useGoalBarStore((state) => state.border)
  const fillColor = useGoalBarStore((state) => state.fillColor)
  const bgColor = useGoalBarStore((state) => state.bgColor)
  const textSize = useGoalBarStore((state) => state.textSize)
  const textWeight = useGoalBarStore((state) => state.textWeight)
  const valueSize = useGoalBarStore((state) => state.valueSize)
  const paddingH = useGoalBarStore((state) => state.paddingH)
  const paddingV = useGoalBarStore((state) => state.paddingV)

  const goals = useGoalsStore((state) => state.goals)

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${width}px`
      barRef.current.style.height = `${height}px`
      barRef.current.style.fontWeight = textWeight + ''
      barRef.current.style.color = fillColor
      barRef.current.style.backgroundColor = bgColor
    }
    if (descriptionRef.current && darkDescriptionRef.current) {
      descriptionRef.current.style.left = `${paddingH}px`
      darkDescriptionRef.current.style.left = `${paddingH - border}px`
      descriptionRef.current.style.bottom = `${paddingV}px`
      darkDescriptionRef.current.style.bottom = `${paddingV - border}px`
      descriptionRef.current.style.fontSize = `${textSize}px`
      darkDescriptionRef.current.style.fontSize = `${textSize}px`
    }
    if (goalValueRef.current && darkValueRef.current) {
      goalValueRef.current.style.left = `${width - paddingH - goalValueRef.current.clientWidth}px`
      darkValueRef.current.style.left = `${
        width - paddingH - darkValueRef.current.clientWidth - border
      }px`
      goalValueRef.current.style.fontSize = `${valueSize}px`
      darkValueRef.current.style.fontSize = `${valueSize}px`
      const vCenter = height / 2 - goalValueRef.current.offsetHeight / 2
      goalValueRef.current.style.top = `${vCenter}px`
      darkValueRef.current.style.top = `${vCenter - border}px`
    }
    if (fillRef.current) {
      let fillSize =
        ((totalValue - previousValue) * width) / (goalValue - previousValue) - border * 2
      if (fillSize > width - border * 2) fillSize = width - border * 2
      fillRef.current.style.width = `${fillSize > 0 ? fillSize : 0}px`
      fillRef.current.style.height = `${height - border * 2}px`
      fillRef.current.style.left = `${border}px`
      fillRef.current.style.top = `${border}px`
      fillRef.current.style.color = bgColor
      fillRef.current.style.backgroundColor = fillColor
    }
  }, [
    fillColor,
    bgColor,
    border,
    paddingH,
    paddingV,
    width,
    height,
    textSize,
    textWeight,
    valueSize,
    totalValue,
    goalValue,
    goals
  ])

  useEffect(() => {
    checkNextGoal()
  }, [totalValue, goals])

  useEffect(() => {
    if (actualGoal && actualGoal.value) updateGoalValue(actualGoal.value)
    if (previousGoal && previousGoal.value) updatePreviousValue(previousGoal.value)
  }, [actualGoal, previousGoal])

  const checkNextGoal = (id: number = 0): void => {
    if (goals.length > id && goals[id].value) {
      if (totalValue < goals[id].value!) {
        setActualGoal(goals[id])
        if (id > 0) setPreviousGoal(goals[id - 1])
        else updatePreviousValue(0)
      } else checkNextGoal(id + 1)
    } else updateGoalValue(totalValue)
  }

  return (
    <section id="goal-bar">
      <span id="total-value" ref={totalValueRef}>
        {totalValue}
      </span>
      <div ref={barRef} className="relative overflow-hidden">
        <span className="absolute z-10 whitespace-nowrap" ref={descriptionRef}>
          {actualGoal?.title}
        </span>
        <span className="absolute z-10 whitespace-nowrap" ref={goalValueRef}>
          {goalValue}
        </span>
        <div className="relative overflow-hidden" ref={fillRef}>
          <span className="absolute z-10 whitespace-nowrap" ref={darkDescriptionRef}>
            {actualGoal?.title}
          </span>
          <span className="absolute z-10 whitespace-nowrap" ref={darkValueRef}>
            {goalValue}
          </span>
        </div>
      </div>
    </section>
  )
}
