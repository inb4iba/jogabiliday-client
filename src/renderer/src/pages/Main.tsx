import { Accordion } from '@renderer/components/Accordion'
import { Separator } from '@renderer/components/Separator'
import { GoalsSection } from '@renderer/components/sections/GoalsSection'
import { ScrapingSection } from '@renderer/components/sections/ScrapingSection'
import { JSX } from 'react'

export const Main = (): JSX.Element => {
  return (
    <main className="flex flex-col justify-between flex-grow p-3 pt-8 bg-zinc-800 text-zinc-100">
      <div className="flex flex-col gap-4">
        <Accordion title="Sites">
          <ScrapingSection />
        </Accordion>
        <Separator />
        <Accordion title="Metas">
          <GoalsSection />
        </Accordion>
        <Separator />
        <Accordion title="Configurações">
          <h4>Configurações</h4>
        </Accordion>
      </div>
      <h1>Ipsum</h1>
    </main>
  )
}
