import { useSupportersStore } from '@renderer/store/supportersStore'
import { JSX } from 'react'

export const Supporters = (): JSX.Element => {
  const supporters = useSupportersStore((state) => state.supporters)

  return (
    <section id="supporters" className="flex flex-col">
      <label id="label">APOIADORES</label>
      <span>{supporters}</span>
    </section>
  )
}
