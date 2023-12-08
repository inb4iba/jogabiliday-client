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
import { useGoalsStore } from '@renderer/store/goalsStore'
import { GoalsList } from '@renderer/components/overlay/GoalsList'
import { useGoalsListStore } from '@renderer/store/goalsListStore'
import { useGenericBarStore } from '@renderer/store/genericBarStore'

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
  const [
    updateGenericBgColor,
    updateGenericFillColor,
    updateGenericWidth,
    updateGenericHeight,
    updateGenericBorder,
    updateGenericPaddingH,
    updateGenericValueSize,
    updateGenericTextWeight
  ] = useGenericBarStore((state) => [
    state.updateBgColor,
    state.updateFillColor,
    state.updateWidth,
    state.updateHeight,
    state.updateBorder,
    state.updatePaddingH,
    state.updateValueSize,
    state.updateTextWeight
  ])
  const [
    updateShirts,
    oldShirts,
    updateOldShirts,
    updateShirtsColor,
    updateShirtsFontSize,
    updateShirtsFontWeight,
    updateShirtsShowLabel,
    updateShirtsGoal
  ] = useShirtsStore((state) => [
    state.updateShirts,
    state.oldShirts,
    state.updateOldShirts,
    state.updateColor,
    state.updateFontSize,
    state.updateFontWeight,
    state.updateShowLabel,
    state.updateGoal
  ])
  const [
    updateSupporters,
    updateOldSupporters,
    updateSupportersColor,
    updateSupportersFontSize,
    updateSupportersFontWeight,
    updateSupportersShowLabel,
    updateSupportersGoal
  ] = useSupportersStore((state) => [
    state.updateSupporters,
    state.updateOldSupporters,
    state.updateColor,
    state.updateFontSize,
    state.updateFontWeight,
    state.updateShowLabel,
    state.updateGoal
  ])
  const [oldTipaValue, setOldTipaValue] = useTipaStore((state) => [
    state.oldValue,
    state.setOldValue
  ])
  const [oldOreloValue, setOldOreloValue, oldSupporters, setOldSupporters] = useOreloStore(
    (state) => [state.oldValue, state.setOldValue, state.oldSupporters, state.setOldSupporters]
  )
  const updateGoals = useGoalsStore((state) => state.setGoals)

  const [updateListSize, updateNextGoalsAmount] = useGoalsListStore((state) => [
    state.updateListSize,
    state.updateNextGoalsAmount
  ])

  useEffect(() => {
    updateOldSupporters(oldSupporters)
  }, [oldSupporters])

  useEffect(() => {
    ws.onmessage = (e): void => {
      const { event, args } = JSON.parse(e.data)
      if (event === 'CUSTOMIZATION:BAR') {
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
      } else if (event === 'CUSTOMIZATION:GENERIC_BAR') {
        console.log('custom generic', args[0])
        const { bgColor, fillColor, width, height, border, paddingH, valueSize, textWeight } =
          args[0]
        updateGenericBgColor(bgColor)
        updateGenericFillColor(fillColor)
        updateGenericBorder(border)
        updateGenericHeight(height)
        updateGenericPaddingH(paddingH)
        updateGenericTextWeight(textWeight)
        updateGenericValueSize(valueSize)
        updateGenericWidth(width)
      } else if (event === 'CUSTOMIZATION:LIST') {
        const { listSize, nextGoalsAmount } = args[0] as CustomizationListData
        updateListSize(listSize)
        updateNextGoalsAmount(nextGoalsAmount)
      } else if (event === 'CUSTOMIZATION:SHIRTS') {
        console.log('shirts', args[0])
        const { color, fontSize, fontWeight, showLabel, goal } = args[0] as CustomizationShirtData
        updateShirtsColor(color)
        updateShirtsFontSize(fontSize)
        updateShirtsFontWeight(fontWeight)
        updateShirtsShowLabel(showLabel)
        updateShirtsGoal(goal)
      } else if (event === 'CUSTOMIZATION:SUPPORTERS') {
        console.log('supporters', args[0])
        const { color, fontSize, fontWeight, showLabel, goal } =
          args[0] as CustomizationSupportersData
        updateSupportersColor(color)
        updateSupportersFontSize(fontSize)
        updateSupportersFontWeight(fontWeight)
        updateSupportersShowLabel(showLabel)
        updateSupportersGoal(goal)
      } else if (event === 'SHIRTS') {
        updateShirts(+args[0])
      } else if (event === 'SUPPORTERS') {
        updateSupporters(+args[0])
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
          case 'SHIRTS':
            updateShirtsFromSite(data)
            break
        }
      } else if (event === 'GOALS') {
        const goals = args[0] as Goal[]
        updateGoals(goals)
      }
    }
  }, [])

  const addValue = (value: number): void => {
    updateTotalValue(value)
  }

  const updateOrelo = (data: ValueData): void => {
    const value = +data.value.replace('R$', '').trim().replace('.', '').replace(',', '.')
    const supporters = data.supporters ? +data.supporters : 0
    if (oldOreloValue !== value) {
      updateTotalValue(oldOreloValue - value)
      setOldOreloValue(value)
    }
    if (oldSupporters !== supporters) {
      console.log(oldSupporters, supporters)
      updateSupporters(oldSupporters - supporters)
      setOldSupporters(supporters)
    }
  }

  const updateTipa = (data: ValueData): void => {
    const value = +data.value.replace('R$', '').trim().replace('.', '').replace(',', '.')
    if (oldTipaValue !== value) {
      updateTotalValue(oldTipaValue - value)
      setOldTipaValue(value)
    }
  }

  const updateShirtsFromSite = (data: ValueData): void => {
    console.log(data)
    const value = +data.value
    if (oldShirts !== value) {
      updateOldShirts(value)
    }
  }

  return (
    <div className="relative flex flex-col w-full h-screen gap-6 p-6">
      <GoalBar />
      <Supporters />
      <Shirts />
      <GoalsList />
    </div>
  )
}
