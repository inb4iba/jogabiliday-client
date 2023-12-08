import { JSX, RefObject } from 'react'

type Props = {
  type: 'text' | 'color'
  label?: string
  value?: string
  placeholder?: string
  _ref: RefObject<HTMLInputElement>
  onChange?: () => void
}

export const Input = (props: Props): JSX.Element => {
  return (
    <div className="flex flex-col w-full gap-1">
      {props.label && <label>{props.label}</label>}
      <input
        placeholder={props.placeholder}
        type={props.type}
        className={`p-2 border-2 border-transparent rounded-md outline-none bg-zinc-900 focus:border-teal-300 ${
          props.type === 'color' ? 'h-12 w-full' : ''
        }`}
        ref={props._ref}
        onChange={props.onChange}
        defaultValue={props.value}
      />
    </div>
  )
}
