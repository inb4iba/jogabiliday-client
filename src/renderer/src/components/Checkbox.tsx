import { JSX, RefObject } from 'react'

type Props = {
  label?: string
  value: boolean
  _ref: RefObject<HTMLInputElement>
  onChange?: () => void
}

export const Checkbox = (props: Props): JSX.Element => {
  return (
    <div className="flex items-center w-full gap-2">
      {props.label && <label>{props.label}</label>}
      <input
        type="checkbox"
        defaultChecked={props.value}
        onChange={props.onChange}
        ref={props._ref}
      />
    </div>
  )
}
