import { JSX, useRef } from 'react'

export const Supporters = (): JSX.Element => {
  const supportersRef = useRef<HTMLSpanElement>(null)

  return (
    <section id="supporters" className="px-6 flex flex-col">
      <label id="label">APOIADORES</label>
      <span ref={supportersRef}>0</span>
    </section>
  )
}
