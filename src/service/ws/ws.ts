import { server } from 'websocket'
import { Server } from 'http'

export function cover(httpServer: Server): server {
  return new server({httpServer})
}
