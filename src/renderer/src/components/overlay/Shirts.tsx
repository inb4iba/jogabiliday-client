import { useShirtsStore } from '@renderer/store/shirtsStore'
import { JSX, useEffect, useRef } from 'react'
import { GenericBar } from '../GenericaBar'

export const Shirts = (): JSX.Element => {
  const textRef = useRef<HTMLSpanElement>(null)

  const [shirts, oldShirts, fontSize, fontWeight, color, showLabel, goal] = useShirtsStore(
    (state) => [
      state.shirts,
      state.oldShirts,
      state.fontSize,
      state.fontWeight,
      state.color,
      state.showLabel,
      state.goal
    ]
  )

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.fontSize = `${fontSize}px`
      textRef.current.style.fontWeight = fontWeight + ''
      textRef.current.style.color = color
    }
  }, [color, fontSize, fontWeight])

  return (
    <section id="shirts" className="flex gap-6 font-mono-rgo">
      <div className="flex flex-col">
        {showLabel && <label id="label">CAMISETAS</label>}
        <span ref={textRef}>{Math.floor(oldShirts / goal) + shirts}</span>
      </div>
      <GenericBar goalValue={goal} totalValue={oldShirts} />
    </section>
  )
}
