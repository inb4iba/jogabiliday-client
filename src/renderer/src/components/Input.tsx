import { JSX, RefObject } from 'react'

type Props = {
  placeholder: string
  idRef: RefObject<HTMLInputElement>
  onChange: () => void
}

export const Input = (props: Props): JSX.Element => {
  return (
    <input
      placeholder={props.placeholder}
      type="text"
      className="p-2 border-2 border-transparent rounded-md outline-none bg-zinc-900 focus:border-teal-300"
      ref={props.idRef}
      onChange={props.onChange}
    />
  )
}
