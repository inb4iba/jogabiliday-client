import { useSupportersStore } from '@renderer/store/supportersStore'
import { JSX, useEffect, useRef } from 'react'

export const Supporters = (): JSX.Element => {
  const textRef = useRef<HTMLSpanElement>(null)
  const [supporters, oldSupporters, fontSize, fontWeight, color, showLabel] = useSupportersStore(
    (state) => [
      state.supporters,
      state.oldSupporters,
      state.fontSize,
      state.fontWeight,
      state.color,
      state.showLabel
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
    <section id="supporters" className="flex flex-col font-mono-rgo">
      {showLabel && <label id="label">APOIADORES</label>}
      <span ref={textRef}>{Math.floor(oldSupporters / 10) + supporters}</span>
    </section>
  )
}
