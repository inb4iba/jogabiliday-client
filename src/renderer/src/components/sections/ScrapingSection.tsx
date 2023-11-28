import { Button } from '../Button'
import { JSX } from 'react'

export const ScrapingSection = (): JSX.Element => {
  return (
    <section>
      <h4>Orelo</h4>
      <div className="flex">
        <Button className="flex-grow" onClick={window.scrapingApi.openOrelo}>
          <span>Abrir Janela</span>
        </Button>
      </div>
      <h4>Tipa Ai</h4>
      <div className="flex">
        <Button className="flex-grow">
          <span>Abrir Janela</span>
        </Button>
      </div>
    </section>
  )
}
