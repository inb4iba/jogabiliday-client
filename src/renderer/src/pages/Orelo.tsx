import { Titlebar } from '@renderer/components/Titlebar'

export const Orelo = (): JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <Titlebar title="Orelo" />
      <object className="flex-grow" type="text/html" data="https://orelo.cc/"></object>
    </div>
  )
}
