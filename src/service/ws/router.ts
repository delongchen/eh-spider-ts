import { router, IRouterRequest } from 'websocket'
import {POOL, broadcast, p2p} from './conPool'

const wsRouter = new router

const defReqHandler = (req: IRouterRequest) => {
  const connection = req.accept(req.origin)
  const wsReq = req.webSocketRequest
  const wsKey = wsReq.key

  connection.on('message', data => {
    if (data.type !== 'utf8') return
    const msg = data.utf8Data ?? ''
    broadcast(msg)
  })

  connection.on('close', (code, desc) => {
    const exist = POOL.get(wsKey)
    if (exist) {
      POOL.delete(wsKey)
    }
  })

  connection.on('error', err => {
    console.log(`${wsKey} err`)
  })

  POOL.set(wsKey, connection)
  p2p(wsKey, 'connected!')
}

wsRouter.mount('*', 'eh', defReqHandler)

export {
  wsRouter
}
