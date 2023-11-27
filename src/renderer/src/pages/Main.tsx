import { Accordion } from '@renderer/components/Accordion'
import { JSX } from 'react'

export const Main = (): JSX.Element => {
  return (
    <main className="flex flex-col justify-between flex-grow p-3 bg-zinc-800 text-zinc-100">
      <div className="flex flex-col gap-4">
        <Accordion title="Sites">
          <>
            <h2>Orelo</h2>
            <div>
              <button>Abrir janela</button>
            </div>
            <h2>Tipa Ai</h2>
            <div>
              <button>Abrir janela</button>
            </div>
          </>
        </Accordion>
        <Accordion title="Metas">
          <h2>Metas</h2>
        </Accordion>
        <Accordion title="Configurações">
          <h2>Configurações</h2>
        </Accordion>
      </div>
      <h1>Ipsum</h1>
    </main>
  )
}
