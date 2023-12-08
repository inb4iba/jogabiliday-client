import { useGoalBarStore } from '@renderer/store/goalBarStore'
import { Input } from '../Input'
import { JSX, useEffect, useRef, useState } from 'react'

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
  const {
    bgColor,
    border,
    fillColor,
    height,
    paddingH,
    paddingV,
    textSize,
    textWeight,
    updateBgColor,
    updateBorder,
    updateFillColor,
    updateHeight,
    updatePaddingH,
    updatePaddingV,
    updateTextSize,
    updateTextWeight,
    updateValueSize,
    updateWidth,
    valueSize,
    width
  } = useGoalBarStore((state) => ({ ...state }))
  const [timeoutHandler, setTimeoutHandler] = useState<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    window.mainApi.customizeBar({
      bgColor,
      fillColor,
      border,
      height,
      paddingH,
      paddingV,
      textSize,
      textWeight,
      valueSize,
      width
    })
  }, [
    bgColor,
    fillColor,
    border,
    height,
    paddingH,
    paddingV,
    textSize,
    textWeight,
    valueSize,
    width
  ])

  const customizeBar = (): void => {
    if (timeoutHandler) clearTimeout(timeoutHandler)
    const handler = setTimeout(() => {
      const colorRegex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

      if (bgColorRef.current && bgColorRef.current.value.match(colorRegex)) {
        updateBgColor(bgColorRef.current.value)
      }
      if (fillColorRef.current && fillColorRef.current.value.match(colorRegex)) {
        updateFillColor(fillColorRef.current.value)
      }
      if (widthRef.current && !isNaN(+widthRef.current.value)) {
        updateWidth(+widthRef.current.value)
      }
      if (heightRef.current && !isNaN(+heightRef.current.value)) {
        updateHeight(+heightRef.current.value)
      }
      if (borderRef.current && !isNaN(+borderRef.current.value)) {
        updateBorder(+borderRef.current.value)
      }
      if (paddingHRef.current && !isNaN(+paddingHRef.current.value)) {
        updatePaddingH(+paddingHRef.current.value)
      }
      if (paddingVRef.current && !isNaN(+paddingVRef.current.value)) {
        updatePaddingV(+paddingVRef.current.value)
      }
      if (textSizeRef.current && !isNaN(+textSizeRef.current.value)) {
        updateTextSize(+textSizeRef.current.value)
      }
      if (valueSizeRef.current && !isNaN(+valueSizeRef.current.value)) {
        updateValueSize(+valueSizeRef.current.value)
      }
      if (textWeightRef.current && !isNaN(+textWeightRef.current.value)) {
        updateTextWeight(+textWeightRef.current.value)
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
          value={fillColor}
        />
        <Input
          type="color"
          label="Cor Secundária"
          onChange={customizeBar}
          _ref={bgColorRef}
          value={bgColor}
        />
      </div>
      <div className="flex justify-between gap-2">
        <Input
          _ref={widthRef}
          label="Largura"
          type="text"
          onChange={customizeBar}
          value={width + ''}
        />
        <Input
          _ref={heightRef}
          label="Altura"
          type="text"
          onChange={customizeBar}
          value={height + ''}
        />
      </div>
      <div className="flex justify-between gap-2">
        <Input
          _ref={paddingHRef}
          label="Espaçamento Horizontal"
          type="text"
          onChange={customizeBar}
          value={paddingH + ''}
        />
        <Input
          _ref={paddingVRef}
          label="Espaçamento Vertical"
          type="text"
          onChange={customizeBar}
          value={paddingV + ''}
        />
      </div>
      <div className="flex justify-between gap-2">
        <Input
          _ref={textSizeRef}
          label="Tamanho texto"
          type="text"
          onChange={customizeBar}
          value={textSize + ''}
        />
        <Input
          _ref={valueSizeRef}
          label="Tamanho valor"
          type="text"
          onChange={customizeBar}
          value={valueSize + ''}
        />
      </div>
      <div className="flex justify-between gap-2">
        <Input
          _ref={borderRef}
          label="Borda"
          type="text"
          onChange={customizeBar}
          value={border + ''}
        />
        <Input
          _ref={textWeightRef}
          label="Peso fonte"
          type="text"
          onChange={customizeBar}
          value={textWeight + ''}
        />
      </div>
    </>
  )
}
