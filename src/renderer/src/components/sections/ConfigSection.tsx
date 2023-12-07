import { JSX } from 'react'
import { Accordion } from '../Accordion'
import { GoalBarConfig } from '../config/GoalBar'
import { ManualCommands } from '../config/ManualCommands'

export const ConfigSection = (): JSX.Element => {
  return (
    <section className="px-4 py-4 flex flex-col gap-2">
      <Accordion title="Barra de Metas">
        <GoalBarConfig />
      </Accordion>
      <Accordion title="Alterar manualmente">
        <ManualCommands />
      </Accordion>
    </section>
  )
}
