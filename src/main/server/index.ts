import express from 'express'
import { WebSocket } from 'ws'
const app = express()
let server, wss

const onConnection = (): void => {
  console.log('ws connected')
}

export const initializeServer = async (): Promise<void> => {
  server = app.listen(3000)
  wss = new WebSocket.Server({ server })

  wss.on('connection', onConnection)
}

export const sendMessage = async (
  event:
    | 'VALUE'
    | 'CUSTOMIZATION:BAR'
    | 'CUSTOMIZATION:GENERIC_BAR'
    | 'CUSTOMIZATION:LIST'
    | 'CUSTOMIZATION:SHIRTS'
    | 'CUSTOMIZATION:SUPPORTERS'
    | 'SUPPORTERS'
    | 'SHIRTS'
    | 'GOALS',
  ...args
): Promise<void> => {
  const data = {
    event,
    args
  }

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data))
  })
}

export const closeServer = async (): Promise<void> => {
  await server.close()
  await wss.close()
}
