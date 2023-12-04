import { Accordion } from '@renderer/components/Accordion'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { ConfigSection } from '@renderer/components/sections/ConfigSection'
import { GoalsSection } from '@renderer/components/sections/GoalsSection'
import { ScrapingSection } from '@renderer/components/sections/ScrapingSection'
import { JSX, useEffect, useState } from 'react'

export const Main = (): JSX.Element => {
  const [status, setStatus] = useState('Servidor parado')
  const [serverBtn, setServerBtn] = useState<
    'STOPPED' | 'RUNNING' | 'CONNECTING' | 'DISCONNECTING'
  >('STOPPED')

  useEffect(() => {
    // add connection and disconnection handler
  }, [])

  const startServer = (): void => {
    window.mainApi.startServer()
    setServerBtn('CONNECTING')
    setStatus('Iniciando servidor...')
  }

  const stopServer = (): void => {
    window.mainApi.stopServer()
    setServerBtn('DISCONNECTING')
    setStatus('Parando servidor...')
  }

  return (
    <main className="relative flex flex-col justify-between flex-grow p-3 pt-8 bg-zinc-800 text-zinc-100">
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
          <ConfigSection />
        </Accordion>
      </div>
      <div className="flex pb-8">
        <Button
          className={`flex-grow ${
            serverBtn === 'STOPPED'
              ? 'bg-teal-300 hover:bg-teal-400 text-zinc-800'
              : serverBtn === 'RUNNING'
                ? 'bg-red-600 hover:bg-red-500'
                : 'disabled text-zinc-400 bg-zinc-700 hover:bg-zinc-700 cursor-default'
          }`}
          onClick={
            serverBtn === 'STOPPED' ? startServer : serverBtn === 'RUNNING' ? stopServer : undefined
          }
        >
          <span>
            {serverBtn === 'RUNNING' ? (
              'Parar captura de dados'
            ) : serverBtn === 'STOPPED' ? (
              'Iniciar captura de dados'
            ) : (
              <>a</>
            )}
          </span>
        </Button>
      </div>
      <div className="fixed bottom-0 left-0 flex items-center justify-end w-full h-8 p-1 px-4 bg-zinc-800 text-zinc-400">
        {status}
      </div>
    </main>
  )
}
