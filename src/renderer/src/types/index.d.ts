type Data = {
  type: 'data' | 'error'
  data?: {
    message: string
  }
}

type ValueData = {
  from: 'ORELO' | 'TIPA' | 'MANUAL' | 'SHIRTS'
  supporters?: string
  value: string
}

type Goal = {
  id: number
  title?: string
  value?: number
}

type CustomizationBarData = {
  bgColor: string
  fillColor: string
  width: number
  height: number
  border: number
  paddingH: number
  paddingV: number
  textSize: number
  valueSize: number
  textWeight: number
}

type CustomizationGenericBarData = {
  bgColor: string
  fillColor: string
  width: number
  height: number
  border: number
  paddingH: number
  valueSize: number
  textWeight: number
}

type CustomizationListData = {
  nextGoalsAmount: number
  listSize: number
}

type CustomizationShirtData = {
  color: string
  fontSize: number
  fontWeight: number
  showLabel: boolean
  goal: number
}

type CustomizationSupportersData = {
  color: string
  fontSize: number
  fontWeight: number
  showLabel: boolean
  goal: number
}

interface Window {
  windowApi: {
    minimize: () => void
    maximize: () => void
    restore: () => void
    close: () => void
    onResizeWindow: (callback: () => void) => void
    getTitle: () => Promise<string>
  }

  mainApi: {
    openOrelo: () => void
    closeOrelo: () => void
    showOrelo: () => void
    hideOrelo: () => void
    onOreloHide: (callback: () => void) => void
    openTipa: () => void
    closeTipa: () => void
    showTipa: () => void
    hideTipa: () => void
    onTipaHide: (callback: () => void) => void
    startServer: ({ oreloId: string }) => Promise<Data>
    stopServer: () => Promise<Data>
    customizeBar: (data: CustomizationBarData) => void
    customizeGenericBar: (data: CustomizationGenericBarData) => void
    customizeList: (data: CustomizationListData) => void
    customizeShirt: (data: CustomizationShirtData) => void
    customizeSupporters: (data: CustomizationSupportersData) => void
    updateShirts: (data: number) => void
    updateSupporters: (data: number) => void
    updateTotalValue: (data: ValueData) => void
    updateGoals: (data: Goal[]) => void
  }
}
