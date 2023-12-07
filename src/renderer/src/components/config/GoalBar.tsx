import { Input } from '../Input'
import { JSX, useRef, useState } from 'react'

export const GoalBarConfig = (): JSX.Element => {
  const bgColorRef = useRef<HTMLInputElement>(null)
  const fillColorRef = useRef<HTMLInputElement>(null)
  const widthRef = useRef<HTMLInputElement>(null)
  const heightRef = useRef<HTMLInputElement>(null)
  const borderRef = useRef<HTMLInputElement>(null)
  const paddingHRef = useRef<HTMLInputElement>(null)
  const paddingVRef = useRef<HTMLInputElement>(null)
  const textSizeRef = useRef<HTMLInputElement>(null)
  const valueSizeRef = useRef<HTMLInputElement>(null)
  const textWeightRef = useRef<HTMLInputElement>(null)
  const [timeoutHandler, setTimeoutHandler] = useState<ReturnType<typeof setTimeout> | null>(null)

  const customizeBar = (): void => {
    if (timeoutHandler) clearTimeout(timeoutHandler)
    const handler = setTimeout(() => {
      if (
        bgColorRef.current &&
        fillColorRef.current &&
        widthRef.current &&
        heightRef.current &&
        borderRef.current &&
        paddingHRef.current &&
        paddingVRef.current &&
        textSizeRef.current &&
        valueSizeRef.current &&
        textWeightRef.current
      ) {
        const colorRegex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
        if (
          !bgColorRef.current.value.match(colorRegex) ||
          !fillColorRef.current.value.match(colorRegex) ||
          isNaN(+widthRef.current?.value) ||
          isNaN(+heightRef.current?.value) ||
          isNaN(+borderRef.current?.value) ||
          isNaN(+paddingHRef.current?.value) ||
          isNaN(+paddingVRef.current?.value) ||
          isNaN(+textSizeRef.current?.value) ||
          isNaN(+valueSizeRef.current?.value) ||
          isNaN(+textWeightRef.current?.value)
        )
          return
        window.mainApi.customizeBar({
          bgColor: bgColorRef.current.value,
          fillColor: fillColorRef.current.value,
          border: +borderRef.current.value,
          height: +heightRef.current.value,
          paddingH: +paddingHRef.current.value,
          paddingV: +paddingVRef.current.value,
          textSize: +textSizeRef.current.value,
          textWeight: +textWeightRef.current.value,
          valueSize: +valueSizeRef.current.value,
          width: +widthRef.current.value
        })
      }
    }, 700)
    setTimeoutHandler(handler)
  }

  return (
    <>
      <div className="flex justify-between gap-2">
        <Input
          type="color"
          label="Cor Primária"
          onChange={customizeBar}
          _ref={fillColorRef}
          value="#42FFEB"
        />
        <Input
          type="color"
          label="Cor Secundária"
          onChange={customizeBar}
          _ref={bgColorRef}
          value="#261752"
        />
      </div>
      <div className="flex justify-between gap-2">
        <Input _ref={widthRef} label="Largura" type="text" onChange={customizeBar} value="400" />
        <Input _ref={heightRef} label="Altura" type="text" onChange={customizeBar} value="60" />
      </div>
      <div className="flex justify-between gap-2">
        <Input
          _ref={paddingHRef}
          label="Espaçamento Horizontal"
          type="text"
          onChange={customizeBar}
          value="8"
        />
        <Input
          _ref={paddingVRef}
          label="Espaçamento Vertical"
          type="text"
          onChange={customizeBar}
          value="8"
        />
      </div>
      <div className="flex justify-between gap-2">
        <Input
          _ref={textSizeRef}
          label="Tamanho texto"
          type="text"
          onChange={customizeBar}
          value="18"
        />
        <Input
          _ref={valueSizeRef}
          label="Tamanho valor"
          type="text"
          onChange={customizeBar}
          value="32"
        />
      </div>
      <div className="flex justify-between gap-2">
        <Input _ref={borderRef} label="Borda" type="text" onChange={customizeBar} value="4" />
        <Input
          _ref={textWeightRef}
          label="Peso fonte"
          type="text"
          onChange={customizeBar}
          value="500"
        />
      </div>
    </>
  )
}
