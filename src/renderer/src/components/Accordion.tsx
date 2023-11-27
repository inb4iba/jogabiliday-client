import { JSX, useState } from 'react'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu'
import { Button } from './Button'

type Props = {
  title: string
  children: JSX.Element
}

export const Accordion = (props: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <article>
      <header className="flex justify-between">
        <h3 className="text-teal-300">{props.title}</h3>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <LuChevronUp /> : <LuChevronDown />}
        </Button>
      </header>
      {isOpen && <section className="pt-2 flex flex-col gap-2">{props.children}</section>}
    </article>
  )
}
