import { JSX, useEffect, useState } from 'react'
import { GoalBar } from './GoalBar'

export const Overlay = (): JSX.Element => {
  const [wsConnected, setWsConnected] = useState(false)

  useEffect(() => {
    if (!wsConnected) {
      const ws: WebSocket = new WebSocket('ws://localhost:3000')

      ws.onopen = (): void => {
        console.log('connected')
      }

      ws.onmessage = (e): void => {
        console.log('MESSAGE:', e.data)
      }

      setWsConnected(true)
    }
  }, [])

  return (
    <>
      <GoalBar />
    </>
  )
}
