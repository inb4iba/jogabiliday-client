import { Accordion } from '@renderer/components/Accordion'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { GoalsSection } from '@renderer/components/sections/GoalsSection'
import { JSX } from 'react'

export const Main = (): JSX.Element => {
  return (
    <main className="flex flex-col justify-between flex-grow p-3 pt-8 bg-zinc-800 text-zinc-100">
      <div className="flex flex-col gap-4">
        <Accordion title="Sites">
          <>
            <h2>Orelo</h2>
            <div className="flex">
              <Button className="flex-grow">
                <span>Abrir Janela</span>
              </Button>
            </div>
            <h2>Tipa Ai</h2>
            <div className="flex">
              <Button className="flex-grow">
                <span>Abrir Janela</span>
              </Button>
            </div>
          </>
        </Accordion>
        <Separator />
        <Accordion title="Metas">
          <GoalsSection />
        </Accordion>
        <Separator />
        <Accordion title="Configurações">
          <h2>Configurações</h2>
        </Accordion>
      </div>
      <h1>Ipsum</h1>
    </main>
  )
}
