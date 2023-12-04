import { JSX, useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { useOreloStore } from '@renderer/store/oreloStore'

type Props = {
  title: string
  eventsName: string
  hasIdInput?: boolean
}

export const WindowController = ({ title, eventsName, hasIdInput }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [isRunningOnBackground, setIsRunningOnBackground] = useState(false)
  const setId = useOreloStore((state) => state.setId)
  const idInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.mainApi.onOreloHide(() => {
      if (eventsName.toLowerCase() === 'orelo') {
        setIsRunningOnBackground(true)
      }
    })
  }, [])

  const defineButtonText = (): string => {
    if (!isOpen) return 'Abrir janela'
    if (!isRunningOnBackground) return 'Esconder janela'
    return 'Mostrar janela'
  }

  const primaryBtnHandler = (): void => {
    if (!isOpen) {
      window.mainApi[`open${eventsName}`]()
      setIsOpen(true)
      return
    }
    if (!isRunningOnBackground) {
      window.mainApi[`hide${eventsName}`]()
      setIsRunningOnBackground(true)
      return
    }
    setIsRunningOnBackground(false)
    window.mainApi[`show${eventsName}`]()
  }

  const closeHandler = (): void => {
    window.mainApi[`close${eventsName}`]()
    setIsOpen(false)
    setIsRunningOnBackground(false)
  }

  const onIdInputChange = (): void => {
    if (idInputRef.current) setId(idInputRef.current.value)
  }

  return (
    <div className="flex flex-col gap-1">
      <h4>{title}</h4>
      <div className="flex gap-2">
        <Button className="flex-grow" onClick={primaryBtnHandler}>
          <span>{defineButtonText()}</span>
        </Button>
        {isOpen && (
          <Button className="px-4 transition-colors w-fit" color="red" onClick={closeHandler}>
            <span>Fechar janela</span>
          </Button>
        )}
      </div>
      {hasIdInput && <Input placeholder="ID" idRef={idInputRef} onChange={onIdInputChange} />}
    </div>
  )
}
