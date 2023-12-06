import { useEffect, useRef, useState } from 'react'

export const GoalBar = (): JSX.Element => {
  const totalValueRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLSpanElement>(null)
  const goalValueRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const darkDescriptionRef = useRef<HTMLSpanElement>(null)
  const darkValueRef = useRef<HTMLSpanElement>(null)

  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(60)
  const [totalValue, setTotalValue] = useState(950)
  const [goalValue, setGoalValue] = useState(1000)
  const [previousValue, setPreviousValue] = useState(0)
  const [border, setBorder] = useState(4)
  const [fillColor, setFillColor] = useState('#42FFEB')
  const [emptyColor, setEmptyColor] = useState('#261752')
  const [textSize, setTextSize] = useState(18)
  const [textWeight, setTextWeight] = useState(500)
  const [valueSize, setValueSize] = useState(32)
  const [padding, setPadding] = useState(8)

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${width}px`
      barRef.current.style.height = `${height}px`
      barRef.current.style.fontWeight = textWeight + ''
      barRef.current.style.color = fillColor
      barRef.current.style.backgroundColor = emptyColor
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
      fillRef.current.style.color = emptyColor
      fillRef.current.style.backgroundColor = fillColor
    }
  }, [])

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
