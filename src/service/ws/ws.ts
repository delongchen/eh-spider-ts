import { server } from 'websocket'
import { httpServer } from '../koa'
import { wsRouter } from './router'

const wsServer = new server({httpServer})

wsRouter.attachServer(wsServer)

httpServer.listen(11451)
