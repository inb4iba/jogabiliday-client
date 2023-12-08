import { JSX } from 'react'

type Props = {
  complete?: boolean
  text: string
  value: number
}

export const GoalItem = (props: Props): JSX.Element => {
  return (
    <div
      className={`flex gap-2 p-1 bg-teal-400 shared-gradient text-2xl uppercase ${
        props.complete ? 'complete' : ''
      }`}
    >
      <p className="flex items-center flex-grow px-1">{props.text}</p>
      <div
        className={`flex w-1/3 px-1 font-medium bg-zinc-900 ${
          props.complete ? 'justify-center text-yellow-300' : 'justify-end text-green-300'
        }`}
      >
        <p className="flex items-end">
          {!props.complete && <span className="text-xs">R$</span>}
          {props.complete ? 'Batida!' : props.value}
        </p>
      </div>
    </div>
  )
}
