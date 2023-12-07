import { JSX, useRef } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'

export const ManualCommands = (): JSX.Element => {
  const valueRef = useRef<HTMLInputElement>(null)

  const addValue = (): void => {
    if (valueRef.current && !isNaN(+valueRef.current.value))
      window.mainApi.updateTotalValue({ from: 'MANUAL', value: valueRef.current.value })
  }
  const removeValue = (): void => {
    if (valueRef.current && !isNaN(+valueRef.current.value))
      window.mainApi.updateTotalValue({
        from: 'MANUAL',
        value: (+valueRef.current.value * -1).toString()
      })
  }
  const onAddShirt = (): void => {
    window.mainApi.updateShirts(1)
  }
  const onRemoveShirt = (): void => {
    window.mainApi.updateShirts(-1)
  }
  const onAddSupporter = (): void => {
    window.mainApi.updateSupporters(1)
  }
  const onRemoveSupporter = (): void => {
    window.mainApi.updateSupporters(-1)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <span>Camisetas</span>
        <Button onClick={onAddShirt}>
          <p className="flex justify-between px-2">
            Adicionar camiseta <span>[ ctrl + shift + alt + ! ]</span>
          </p>
        </Button>
        <Button onClick={onRemoveShirt}>
          <p className="flex justify-between px-2">
            Remover camiseta <span>[ ctrl + shift + alt + @ ]</span>
          </p>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <span>Apoiadores</span>
        <Button onClick={onAddSupporter}>
          <p className="flex justify-between px-2">
            Adicionar apoiador <span>[ ctrl + shift + alt + # ]</span>
          </p>
        </Button>
        <Button onClick={onRemoveSupporter}>
          <p className="flex justify-between px-2">
            Remover apoiador <span>[ ctrl + shift + alt + $ ]</span>
          </p>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <span>Apoios</span>
        <Input type="text" _ref={valueRef} placeholder="Valor" />
        <div className="flex gap-2">
          <Button className="flex-grow" onClick={addValue}>
            Adicionar
          </Button>
          <Button className="flex-grow" onClick={removeValue}>
            Remover
          </Button>
        </div>
      </div>
    </>
  )
}
