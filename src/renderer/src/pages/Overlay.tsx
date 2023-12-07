import { JSX, useEffect } from 'react'
import { GoalBar } from '../components/overlay/GoalBar'
import { useGoalBarStore } from '@renderer/store/goalBarStore'
import { Supporters } from '@renderer/components/overlay/Supporters'
import { Shirts } from '@renderer/components/overlay/Shirts'
import { useShirtsStore } from '@renderer/store/shirtsStore'
import { useSupportersStore } from '@renderer/store/supportersStore'
import { ws } from '@renderer/service/socket'

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
  const updateShirts = useShirtsStore((state) => state.updateShirts)
  const updateSupporters = useSupportersStore((state) => state.updateSupporters)

  useEffect(() => {
    ws.onmessage = (e): void => {
      const { event, args } = JSON.parse(e.data)
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
      } else if (event === 'SHIRTS') {
        updateShirts(args[0])
      } else if (event === 'SUPPORTERS') {
        updateSupporters(args[0])
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-6 p-6">
      <GoalBar />
      <Supporters />
      <Shirts />
    </div>
  )
}
