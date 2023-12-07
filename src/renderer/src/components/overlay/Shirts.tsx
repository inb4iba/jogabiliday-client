import { useShirtsStore } from '@renderer/store/shirtsStore'
import { JSX } from 'react'

export const Shirts = (): JSX.Element => {
  const [shirts, oldShirts] = useShirtsStore((state) => [state.shirts, state.oldShirts])

  return (
    <section id="shirts" className="flex flex-col">
      <label id="label">CAMISETAS</label>
      <span>{Math.floor(oldShirts / 10) + shirts}</span>
    </section>
  )
}
