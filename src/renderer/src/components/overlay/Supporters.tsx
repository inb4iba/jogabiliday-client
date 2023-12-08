import { useSupportersStore } from '@renderer/store/supportersStore'
import { JSX, useEffect, useRef } from 'react'
import { GenericBar } from '../GenericaBar'

export const Supporters = (): JSX.Element => {
  const textRef = useRef<HTMLSpanElement>(null)
  const [supporters, oldSupporters, fontSize, fontWeight, color, showLabel, goal] =
    useSupportersStore((state) => [
      state.supporters,
      state.oldSupporters,
      state.fontSize,
      state.fontWeight,
      state.color,
      state.showLabel,
      state.goal
    ])

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.fontSize = `${fontSize}px`
      textRef.current.style.fontWeight = fontWeight + ''
      textRef.current.style.color = color
    }
  }, [color, fontSize, fontWeight])

  return (
    <section id="supporters" className="flex gap-6 font-mono-rgo">
      <div className="flex flex-col">
        {showLabel && <label id="label">APOIADORES</label>}
        <span ref={textRef}>{Math.floor(oldSupporters / goal) + supporters}</span>
      </div>
      <GenericBar goalValue={goal} totalValue={oldSupporters} />
    </section>
  )
}
