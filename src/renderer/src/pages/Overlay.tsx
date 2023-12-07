import { JSX, useEffect } from 'react'
import { GoalBar } from '../components/overlay/GoalBar'
import { useGoalBarStore } from '@renderer/store/goalBarStore'

export const Overlay = (): JSX.Element => {
  const [
    updateBgColor,
    updateFillColor,
    updateWidth,
    updateHeight,
    updateBorder,
    updatePaddingH,
    updatePaddingV,
    updateValueSize,
    updateTextSize,
    updateTextWeight
  ] = useGoalBarStore((state) => [
    state.updateBgColor,
    state.updateFillColor,
    state.updateWidth,
    state.updateHeight,
    state.updateBorder,
    state.updatePaddingH,
    state.updatePaddingV,
    state.updateValueSize,
    state.updateTextSize,
    state.updateTextWeight
  ])

  useEffect(() => {
    const ws: WebSocket = new WebSocket('ws://localhost:3000')

    ws.onopen = (): void => {
      console.log('connected')
    }

    ws.onmessage = (e): void => {
      const { event, args } = JSON.parse(e.data)
      console.log('EVENT:', event)
      if (event === 'CUSTOMIZATION') {
        const {
          bgColor,
          fillColor,
          width,
          height,
          border,
          paddingH,
          paddingV,
          textSize,
          valueSize,
          textWeight
        } = args[0]
        updateBgColor(bgColor)
        updateFillColor(fillColor)
        updateBorder(border)
        updateHeight(height)
        updatePaddingH(paddingH)
        updatePaddingV(paddingV)
        updateTextSize(textSize)
        updateTextWeight(textWeight)
        updateValueSize(valueSize)
        updateWidth(width)
      }
    }
  }, [])

  return (
    <>
      <GoalBar />
    </>
  )
}
