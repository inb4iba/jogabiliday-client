import { JSX, useEffect } from 'react'
import { GoalBar } from '../components/overlay/GoalBar'
import { useGoalBarStore } from '@renderer/store/goalBarStore'
import { Supporters } from '@renderer/components/overlay/Supporters'
import { Shirts } from '@renderer/components/overlay/Shirts'
import { useShirtsStore } from '@renderer/store/shirtsStore'
import { useSupportersStore } from '@renderer/store/supportersStore'
import { ws } from '@renderer/service/socket'
import { useOreloStore } from '@renderer/store/oreloStore'
import { useTipaStore } from '@renderer/store/tipaStore'

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
    updateTextWeight,
    updateTotalValue
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
    state.updateTextWeight,
    state.updateTotalValue
  ])
  const updateShirts = useShirtsStore((state) => state.updateShirts)
  const updateSupporters = useSupportersStore((state) => state.updateSupporters)
  const [oldTipaValue, setOldTipaValue] = useTipaStore((state) => [
    state.oldValue,
    state.setOldValue
  ])
  const [oldOreloValue, setOldOreloValue, oldSupporters, setOldSupporters] = useOreloStore(
    (state) => [state.oldValue, state.setOldValue, state.oldSupporters, state.setOldSupporters]
  )

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
      } else if (event === 'VALUE') {
        const data = args[0] as ValueData
        switch (data.from) {
          case 'MANUAL':
            addValue(+data.value)
            break
          case 'ORELO':
            updateOrelo(data)
            break
          case 'TIPA':
            updateTipa(data)
            break
        }
      }
    }
  }, [])

  const addValue = (value: number): void => {
    updateTotalValue(value)
  }

  const updateOrelo = (data: ValueData): void => {
    const value = +data.value.replace('R$', '').trim().replace(',', '.')
    const supporters = data.supporters ? +data.supporters : 0
    if (oldOreloValue !== value) {
      updateTotalValue(oldOreloValue - value)
      setOldOreloValue(value)
    }
    if (oldSupporters !== supporters) {
      updateSupporters(oldSupporters - supporters)
      setOldSupporters(supporters)
    }
  }

  const updateTipa = (data: ValueData): void => {
    const value = +data.value.replace('R$', '').trim().replace(',', '.')
    if (oldTipaValue !== value) {
      updateTotalValue(oldTipaValue - value)
      setOldTipaValue(value)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <GoalBar />
      <Supporters />
      <Shirts />
    </div>
  )
}
