import { useShirtsStore } from '@renderer/store/shirtsStore'
import { JSX } from 'react'

export const Shirts = (): JSX.Element => {
  const shirts = useShirtsStore((state) => state.shirts)

  return (
    <section id="shirts" className="flex flex-col">
      <label id="label">CAMISETAS</label>
      <span>{shirts}</span>
    </section>
  )
}
