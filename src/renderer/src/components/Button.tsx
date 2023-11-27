import { JSX } from 'react'

type Props = {
  children: JSX.Element
  className?: string
  onClick?: () => void
}

export const Button = (props: Props): JSX.Element => {
  return (
    <button
      onClick={props.onClick}
      className={`bg-zinc-700 p-2 rounded-md hover:bg-zinc-600 transition-colors ${props.className}`}
    >
      {props.children}
    </button>
  )
}
