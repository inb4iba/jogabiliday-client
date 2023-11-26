import { JSX } from 'react'
import { Titlebar } from './components/Titlebar'
import { Main } from './pages/Main'

export const App = (): JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <Titlebar title="Jogabiliday" />
      <Main />
    </div>
  )
}
