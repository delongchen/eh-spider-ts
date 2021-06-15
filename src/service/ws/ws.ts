import { server } from 'websocket'
import { wsRouter } from './router'
import { Server } from 'http'

export function cover(httpServer: Server): server {
  const wsServer = new server({httpServer})
  wsRouter.attachServer(wsServer)
  return wsServer
}
