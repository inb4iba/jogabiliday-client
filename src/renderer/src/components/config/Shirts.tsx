import { JSX, useRef } from 'react'
import { Input } from '../Input'

export const ShirtsConfig = (): JSX.Element => {
  const fontSizeRef = useRef<HTMLInputElement>(null)
  const fontWeightRef = useRef<HTMLInputElement>(null)
  const test = 0

  const customizeShirts = (): void => {}

  return (
    <>
      <div className="flex justify-between gap-2">
        <Input
          type="text"
          label="Tamanho da Fonte"
          onChange={customizeShirts}
          _ref={fontSizeRef}
          value={test + ''}
        />
        <Input
          type="text"
          label="Peso da Fonte"
          onChange={customizeShirts}
          _ref={fontWeightRef}
          value={test + ''}
        />
      </div>
    </>
  )
}
