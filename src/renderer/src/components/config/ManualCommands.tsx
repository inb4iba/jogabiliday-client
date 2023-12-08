import { JSX, useRef } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Checkbox } from '../Checkbox'

export const ManualCommands = (): JSX.Element => {
  const valueRef = useRef<HTMLInputElement>(null)
  const oreloRef = useRef<HTMLInputElement>(null)
  const tipaRef = useRef<HTMLInputElement>(null)
  const shirtsRef = useRef<HTMLInputElement>(null)

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

  const onChangeSites = (): void => {
    if (oreloRef.current && tipaRef.current && shirtsRef.current)
      window.mainApi.updateSelectedSites({
        orelo: oreloRef.current.checked,
        tipa: tipaRef.current.checked,
        shirts: shirtsRef.current.checked
      })
  }

  const resetCache = (): void => {
    window.mainApi.resetCache()
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <span>Camisetas</span>
        <Button onClick={onAddShirt}>
          <p className="flex items-center justify-between px-2">
            Adicionar camiseta{' '}
            <span className="text-xs font-medium text-zinc-400">CTRL + ALT + HOME</span>
          </p>
        </Button>
        <Button onClick={onRemoveShirt}>
          <p className="flex items-center justify-between px-2">
            Remover camiseta{' '}
            <span className="text-xs font-medium text-zinc-400">CTRL + ALT + END</span>
          </p>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <span>Apoiadores</span>
        <Button onClick={onAddSupporter}>
          <p className="flex items-center justify-between px-2">
            Adicionar apoiador{' '}
            <span className="text-xs font-medium text-zinc-400">CTRL + ALT + PAGE UP</span>
          </p>
        </Button>
        <Button onClick={onRemoveSupporter}>
          <p className="flex items-center justify-between px-2">
            Remover apoiador{' '}
            <span className="text-xs font-medium text-zinc-400 ">CTRL + ALT + PAGE DOWN</span>
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
      <div className="flex flex-col gap-1">
        <Checkbox value={true} label="Orelo" _ref={oreloRef} onChange={onChangeSites} />
        <Checkbox value={true} label="Tipa Ai" _ref={tipaRef} onChange={onChangeSites} />
        <Checkbox value={true} label="Camisetas" _ref={shirtsRef} onChange={onChangeSites} />
      </div>
      <Button onClick={resetCache}>Limpar cache</Button>
    </>
  )
}
