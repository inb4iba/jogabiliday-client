import { JSX } from 'react'
import { Titlebar } from './components/Titlebar'

export const App = (): JSX.Element => {
  return (
    <>
      <Titlebar title="Jogabiliday" />
      <h1 className="text-red-500">Hello World</h1>
    </>
  )
}
