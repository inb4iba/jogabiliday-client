import { JSX } from 'react'

type Props = {
  children: JSX.Element
  className?: string
  color: 'neutral' | 'teal' | 'red' | 'disabled'
  onClick?: () => void
}

export const Button = ({ children, className, color = 'neutral', onClick }: Props): JSX.Element => {
  const variants = {
    neutral: 'bg-zinc-700 hover:bg-zinc-600',
    teal: 'bg-teal-300 hover:bg-teal-400 text-zinc-800',
    red: 'bg-red-600 hover:bg-red-500',
    disabled: 'disabled text-zinc-400 bg-zinc-700 hover:bg-zinc-700 cursor-default'
  }

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md transition-colors ${className} ${variants[color]}`}
    >
      {children}
    </button>
  )
}
