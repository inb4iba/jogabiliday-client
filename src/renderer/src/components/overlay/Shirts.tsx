import { useShirtsStore } from '@renderer/store/shirtsStore'
import { JSX, useEffect, useRef } from 'react'

export const Shirts = (): JSX.Element => {
  const textRef = useRef<HTMLSpanElement>(null)

  const [shirts, oldShirts, fontSize, fontWeight, color, showLabel] = useShirtsStore((state) => [
    state.shirts,
    state.oldShirts,
    state.fontSize,
    state.fontWeight,
    state.color,
    state.showLabel
  ])

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.fontSize = `${fontSize}px`
      textRef.current.style.fontWeight = fontWeight + ''
      textRef.current.style.color = color
    }
  }, [color, fontSize, fontWeight])

  return (
    <section id="shirts" className="flex flex-col font-mono-rgo">
      {showLabel && <label id="label">CAMISETAS</label>}
      <span ref={textRef}>{Math.floor(oldShirts / 10) + shirts}</span>
    </section>
  )
}
