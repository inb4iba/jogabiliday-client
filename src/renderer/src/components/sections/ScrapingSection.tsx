import { JSX } from 'react'
import { WindowController } from '../WindowController'

export const ScrapingSection = (): JSX.Element => {
  return (
    <section className="flex flex-col gap-2">
      <WindowController title="Orelo" eventsName="Orelo" hasIdInput />
      <WindowController title="Tipa Ai" eventsName="Tipa" />
      <WindowController title="Camisetas" eventsName="Shirts" />
    </section>
  )
}
