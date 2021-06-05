import { server, router } from 'websocket'
import { httpServer } from './koa'

const wsServer = new server({httpServer})
const wsRouter = new router()

wsRouter.attachServer(wsServer)

wsRouter.mount('*', 'dd', req => {
  req.
})
