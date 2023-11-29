import { Titlebar } from '@renderer/components/Titlebar'

export const Orelo = (): JSX.Element => {
  const test = (): void => {
    const iframe = document.getElementById('orelo')
    console.log(iframe?.querySelectorAll('a'))
  }

  return (
    <div className="flex flex-col h-screen">
      <Titlebar title="Orelo" />
      <iframe id="orelo" className="flex-grow" src="https://orelo.cc/" onLoad={test}></iframe>
      {/* <object className="flex-grow" type="text/html" data="https://orelo.cc/"></object> */}
    </div>
  )
}
