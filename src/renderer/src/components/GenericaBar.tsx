import { useGenericBarStore } from '@renderer/store/genericBarStore'
import { JSX, useEffect, useRef } from 'react'

type Props = {
  totalValue: number
  goalValue: number
}

export const GenericBar = ({ totalValue, goalValue }: Props): JSX.Element => {
  const barRef = useRef<HTMLDivElement>(null)
  const goalValueRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const darkValueRef = useRef<HTMLSpanElement>(null)

  const width = useGenericBarStore((state) => state.width)
  const height = useGenericBarStore((state) => state.height)
  const border = useGenericBarStore((state) => state.border)
  const fillColor = useGenericBarStore((state) => state.fillColor)
  const bgColor = useGenericBarStore((state) => state.bgColor)
  const textWeight = useGenericBarStore((state) => state.textWeight)
  const valueSize = useGenericBarStore((state) => state.valueSize)
  const paddingH = useGenericBarStore((state) => state.paddingH)

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${width}px`
      barRef.current.style.height = `${height}px`
      barRef.current.style.fontWeight = textWeight + ''
      barRef.current.style.color = fillColor
      barRef.current.style.backgroundColor = bgColor
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
      const mod = totalValue % goalValue
      let fillSize = (mod * width) / goalValue - border * 2
      if (fillSize > width - border * 2) fillSize = width - border * 2
      fillRef.current.style.width = `${fillSize > 0 ? fillSize : 0}px`
      fillRef.current.style.height = `${height - border * 2}px`
      fillRef.current.style.left = `${border}px`
      fillRef.current.style.top = `${border}px`
      fillRef.current.style.color = bgColor
      fillRef.current.style.backgroundColor = fillColor
    }
  }, [totalValue])

  return (
    <section className="font-mono-rgo">
      <div ref={barRef} className="relative overflow-hidden">
        <span className="absolute z-10 whitespace-nowrap" ref={goalValueRef}>
          {totalValue}
        </span>
        <div className="relative overflow-hidden" ref={fillRef}>
          <span className="absolute z-10 whitespace-nowrap" ref={darkValueRef}>
            {totalValue}
          </span>
        </div>
      </div>
    </section>
  )
}
