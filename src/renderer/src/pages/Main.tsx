import { Accordion } from '@renderer/components/Accordion'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { Spinner } from '@renderer/components/Spinner'
import { ConfigSection } from '@renderer/components/sections/ConfigSection'
import { GoalsSection } from '@renderer/components/sections/GoalsSection'
import { ScrapingSection } from '@renderer/components/sections/ScrapingSection'
import { JSX, useState } from 'react'

export const Main = (): JSX.Element => {
  const [status, setStatus] = useState('Servidor parado')
  const [serverBtn, setServerBtn] = useState<
    'STOPPED' | 'RUNNING' | 'CONNECTING' | 'DISCONNECTING'
  >('STOPPED')

  const startServer = async (): Promise<void> => {
    setServerBtn('CONNECTING')
    setStatus('Iniciando servidor...')
    const res = await window.mainApi.startServer()
    if (res === 'connected') {
      setServerBtn('RUNNING')
      setStatus('Servidor rodando')
    }
  }

  const stopServer = async (): Promise<void> => {
    setServerBtn('DISCONNECTING')
    setStatus('Parando servidor...')
    const res = await window.mainApi.stopServer()
    if (res === 'disconnected') {
      setServerBtn('STOPPED')
      setStatus('Servidor parado')
    }
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
          className="flex justify-center flex-grow"
          color={`${
            serverBtn === 'STOPPED' ? 'teal' : serverBtn === 'RUNNING' ? 'red' : 'disabled'
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
              <Spinner />
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
