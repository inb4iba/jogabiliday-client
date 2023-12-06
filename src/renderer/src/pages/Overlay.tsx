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
    updatePadding,
    updateValueSize,
    updateTextSize,
    updateTextWeight
  ] = useGoalBarStore((state) => [
    state.updateBgColor,
    state.updateFillColor,
    state.updateWidth,
    state.updateHeight,
    state.updateBorder,
    state.updatePadding,
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
          padding,
          textSize,
          valueSize,
          textWeight
        } = args[0]
        updateBgColor(bgColor)
        updateFillColor(fillColor)
        updateBorder(border)
        updateHeight(height)
        updatePadding(padding)
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
