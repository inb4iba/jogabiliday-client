import { JSX, useEffect, useState } from 'react'
import { LuMinimize2, LuMaximize2, LuX, LuMinus } from 'react-icons/lu'

type Props = {
  title: string
  icon?: string
}

export const Titlebar = ({ title, icon }: Props): JSX.Element => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    window.titlebarApi.onResizeWindow(() => setIsMaximized(!isMaximized))
  }, [isMaximized])

  const handleMinimizeBtn = (): void => window.titlebarApi.minimize()

  const handleMaximizeBtn = (): void =>
    isMaximized ? window.titlebarApi.restore() : window.titlebarApi.maximize()

  const handleCloseBtn = (): void => window.titlebarApi.close()

  return (
    <header className="relative z-10 flex justify-between shadow-lg draggable bg-zinc-800 text-zinc-100">
      <div className="flex items-center gap-2 px-3">
        {icon && <span>{icon}</span>}
        <span>{title}</span>
      </div>
      <div className="flex non-draggable">
        <button
          onClick={handleMinimizeBtn}
          className="flex items-center justify-center w-10 p-1 transition-all duration-150 cursor-default aspect-square bg-zinc-800 hover:bg-zinc-700"
        >
          <LuMinus />
        </button>
        <button
          onClick={handleMaximizeBtn}
          className="flex items-center justify-center w-10 p-1 transition-all duration-150 cursor-default aspect-square bg-zinc-800 hover:bg-zinc-700"
        >
          {isMaximized ? <LuMinimize2 /> : <LuMaximize2 />}
        </button>
        <button
          onClick={handleCloseBtn}
          className="flex items-center justify-center w-10 p-1 transition-all duration-150 cursor-default aspect-square bg-zinc-800 hover:bg-red-600"
        >
          <LuX />
        </button>
      </div>
    </header>
  )
}
