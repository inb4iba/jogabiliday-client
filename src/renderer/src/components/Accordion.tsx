import { JSX, useState } from 'react'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu'

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
        <button
          className="w-8 aspect-square rounded-md flex items-center justify-center hover:text-teal-300 transition-colors bg-inherit hover:bg-zinc-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <LuChevronUp /> : <LuChevronDown />}
        </button>
      </header>
      {isOpen && <section className="pt-2 flex flex-col gap-2">{props.children}</section>}
    </article>
  )
}
