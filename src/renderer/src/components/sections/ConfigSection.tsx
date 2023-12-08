import { JSX } from 'react'
import { Accordion } from '../Accordion'
import { GoalBarConfig } from '../config/GoalBar'
import { ManualCommands } from '../config/ManualCommands'
import { GoalListConfig } from '../config/GoalsList'

export const ConfigSection = (): JSX.Element => {
  return (
    <section className="flex flex-col gap-2 px-4 py-4">
      <Accordion title="Barra de Metas">
        <GoalBarConfig />
      </Accordion>
      <Accordion title="Lista de Metas">
        <GoalListConfig />
      </Accordion>
      <Accordion title="Alterar manualmente">
        <ManualCommands />
      </Accordion>
    </section>
  )
}
