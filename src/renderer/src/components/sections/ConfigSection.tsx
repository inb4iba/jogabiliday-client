import { JSX } from 'react'
import { Accordion } from '../Accordion'
import { GoalBarConfig } from '../config/GoalBar'

export const ConfigSection = (): JSX.Element => {
  return (
    <section className="px-4 pb-4">
      <Accordion title="Barra de Metas">
        <GoalBarConfig />
      </Accordion>
    </section>
  )
}
