import { useGoalBarStore } from '@renderer/store/goalBarStore'
import { useEffect, useRef } from 'react'

export const GoalBar = (): JSX.Element => {
  const totalValueRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLSpanElement>(null)
  const goalValueRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const darkDescriptionRef = useRef<HTMLSpanElement>(null)
  const darkValueRef = useRef<HTMLSpanElement>(null)

  const totalValue = useGoalBarStore((state) => state.totalValue)
  const goalValue = useGoalBarStore((state) => state.goalValue)
  const previousValue = useGoalBarStore((state) => state.previousValue)
  const width = useGoalBarStore((state) => state.width)
  const height = useGoalBarStore((state) => state.height)
  const border = useGoalBarStore((state) => state.border)
  const fillColor = useGoalBarStore((state) => state.fillColor)
  const bgColor = useGoalBarStore((state) => state.bgColor)
  const textSize = useGoalBarStore((state) => state.textSize)
  const textWeight = useGoalBarStore((state) => state.textWeight)
  const valueSize = useGoalBarStore((state) => state.valueSize)
  const padding = useGoalBarStore((state) => state.padding)

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${width}px`
      barRef.current.style.height = `${height}px`
      barRef.current.style.fontWeight = textWeight + ''
      barRef.current.style.color = fillColor
      barRef.current.style.backgroundColor = bgColor
    }
    if (descriptionRef.current && darkDescriptionRef.current) {
      descriptionRef.current.style.left = `${padding}px`
      darkDescriptionRef.current.style.left = `${padding - border}px`
      descriptionRef.current.style.bottom = `${padding}px`
      darkDescriptionRef.current.style.bottom = `${padding - border}px`
      descriptionRef.current.style.fontSize = `${textSize}px`
      darkDescriptionRef.current.style.fontSize = `${textSize}px`
    }
    if (goalValueRef.current && darkValueRef.current) {
      goalValueRef.current.style.left = `${width - padding - goalValueRef.current.clientWidth}px`
      darkValueRef.current.style.left = `${
        width - padding - darkValueRef.current.clientWidth - border
      }px`
      goalValueRef.current.style.fontSize = `${valueSize}px`
      darkValueRef.current.style.fontSize = `${valueSize}px`
      const vCenter = height / 2 - goalValueRef.current.offsetHeight / 2
      goalValueRef.current.style.top = `${vCenter}px`
      darkValueRef.current.style.top = `${vCenter - border}px`
    }
    if (fillRef.current) {
      const fillSize =
        ((totalValue - previousValue) * width) / (goalValue - previousValue) - border * 2
      fillRef.current.style.width = `${fillSize}px`
      fillRef.current.style.height = `${height - border * 2}px`
      fillRef.current.style.left = `${border}px`
      fillRef.current.style.top = `${border}px`
      fillRef.current.style.color = bgColor
      fillRef.current.style.backgroundColor = fillColor
    }
  }, [fillColor, bgColor, border, padding, width, height, textSize, textWeight, valueSize])

  return (
    <section className="p-6" id="goal-bar">
      <span id="total-value" ref={totalValueRef}>
        {totalValue}
      </span>
      <div ref={barRef} className="relative">
        <span className="absolute z-10 whitespace-nowrap" ref={descriptionRef}>
          Fazer coisa
        </span>
        <span className="absolute z-10 whitespace-nowrap" ref={goalValueRef}>
          {goalValue}
        </span>
        <div className="relative overflow-hidden" ref={fillRef}>
          <span className="absolute z-10 whitespace-nowrap" ref={darkDescriptionRef}>
            Fazer coisa
          </span>
          <span className="absolute z-10 whitespace-nowrap" ref={darkValueRef}>
            {goalValue}
          </span>
        </div>
      </div>
    </section>
  )
}
