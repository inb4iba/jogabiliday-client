import { JSX, useRef } from 'react'

export const Shirts = (): JSX.Element => {
  const shirtsRef = useRef<HTMLSpanElement>(null)

  return (
    <section id="shirts" className="flex flex-col">
      <label id="label">CAMISETAS</label>
      <span ref={shirtsRef}>0</span>
    </section>
  )
}
