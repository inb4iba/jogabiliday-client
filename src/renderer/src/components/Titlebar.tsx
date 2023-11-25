import { JSX } from 'react'
import { LuMinimize2, LuMaximize2, LuX, LuMinus } from 'react-icons/lu'

type Props = {
  title: string
  icon?: string
}

export const Titlebar = ({ title, icon }: Props): JSX.Element => {
  const isMaximized = false //update to state after

  return (
    <header className="draggable flex justify-between bg-zinc-800 text-zinc-100">
      <div className="flex items-center gap-2 px-3">
        {icon && <span>{icon}</span>}
        <span>{title}</span>
      </div>
      <div className="flex non-draggable">
        <button className="flex items-center justify-center w-8 p-1 transition-all duration-150 cursor-default aspect-square bg-zinc-800 hover:bg-zinc-700">
          <LuMinus />
        </button>
        <button className="flex items-center justify-center w-8 p-1 transition-all duration-150 cursor-default aspect-square bg-zinc-800 hover:bg-zinc-700">
          {isMaximized ? <LuMinimize2 /> : <LuMaximize2 />}
        </button>
        <button className="flex items-center justify-center w-8 p-1 transition-all duration-150 cursor-default aspect-square bg-zinc-800 hover:bg-red-600">
          <LuX />
        </button>
      </div>
    </header>
  )
}
