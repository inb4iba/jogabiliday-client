import { Titlebar } from '@renderer/components/Titlebar'

export const Orelo = (): JSX.Element => {
  const test = (): void => {
    const iframe = document.getElementById('orelo') as HTMLIFrameElement
    setTimeout(() => {
      if (iframe) {
        iframe.src = 'https://orelo.cc/podcast/6550ddbdd5ec2430cae8a69b/metricas'
        iframe.removeEventListener('load', test)
      }
    }, 5000)
  }

  return (
    <div className="flex flex-col h-screen">
      <Titlebar title="Orelo" />
      <iframe id="orelo" className="flex-grow" src="https://orelo.cc/" onLoad={test}></iframe>
    </div>
  )
}
