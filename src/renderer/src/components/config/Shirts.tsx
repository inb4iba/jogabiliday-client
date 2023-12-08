import { JSX, useEffect, useRef, useState } from 'react'
import { Input } from '../Input'
import { useShirtsStore } from '@renderer/store/shirtsStore'
import { Checkbox } from '../Checkbox'

export const ShirtsConfig = (): JSX.Element => {
  const fontSizeRef = useRef<HTMLInputElement>(null)
  const fontWeightRef = useRef<HTMLInputElement>(null)
  const showLabelRef = useRef<HTMLInputElement>(null)
  const colorRef = useRef<HTMLInputElement>(null)
  const goalRef = useRef<HTMLInputElement>(null)
  const [
    fontSize,
    fontWeight,
    showLabel,
    color,
    goal,
    updateFontSize,
    updateFontWeight,
    updateShowLabel,
    updateColor,
    updateGoal
  ] = useShirtsStore((state) => [
    state.fontSize,
    state.fontWeight,
    state.showLabel,
    state.color,
    state.goal,
    state.updateFontSize,
    state.updateFontWeight,
    state.updateShowLabel,
    state.updateColor,
    state.updateGoal
  ])
  const [timeoutHandler, setTimeoutHandler] = useState<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    window.mainApi.customizeShirt({ fontSize, fontWeight, showLabel, color, goal })
  }, [fontSize, fontWeight, showLabel, color, goal])

  const customizeShirts = (): void => {
    if (timeoutHandler) clearTimeout(timeoutHandler)
    const handler = setTimeout(() => {
      const colorRegex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
      if (fontSizeRef.current && !isNaN(+fontSizeRef.current.value)) {
        updateFontSize(+fontSizeRef.current.value)
      }
      if (fontWeightRef.current && !isNaN(+fontWeightRef.current.value)) {
        updateFontWeight(+fontWeightRef.current.value)
      }
      if (goalRef.current && !isNaN(+goalRef.current.value)) {
        updateGoal(+goalRef.current.value)
      }
      if (showLabelRef.current) {
        updateShowLabel(showLabelRef.current.checked)
      }
      if (colorRef.current && colorRef.current.value.match(colorRegex)) {
        updateColor(colorRef.current.value)
      }
    }, 700)
    setTimeoutHandler(handler)
  }

  return (
    <>
      <div className="flex justify-between gap-2">
        <Input
          type="text"
          label="Tamanho da Fonte"
          onChange={customizeShirts}
          _ref={fontSizeRef}
          value={fontSize + ''}
        />
        <Input
          type="text"
          label="Peso da Fonte"
          onChange={customizeShirts}
          _ref={fontWeightRef}
          value={fontWeight + ''}
        />
      </div>
      <div className="flex justify-between gap-2">
        <Input type="color" label="Cor" onChange={customizeShirts} _ref={colorRef} value={color} />
        <Input
          type="text"
          label="Qntd para prenda"
          onChange={customizeShirts}
          _ref={goalRef}
          value={goal + ''}
        />
      </div>
      <Checkbox
        label="Mostrar label"
        onChange={customizeShirts}
        _ref={showLabelRef}
        value={showLabel}
      />
    </>
  )
}
