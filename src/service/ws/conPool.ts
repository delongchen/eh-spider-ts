import {connection} from 'websocket'

type WsConPool = Map<string, connection>

const pool: WsConPool = new Map<string, connection>()

function broadcast(msg: string) {
  if (pool.size)
    for (const con of pool.values()) {
      con.send(msg)
    }
}

function broadcastWithout(target: string, msg: string) {
  if (pool.size) {
    for (const key of pool.keys()) {
      if (key !== target) {
        pool.get(key).send(msg)
      }
    }
  }
}

function p2p(target: string, msg: string) {
  const exist = pool.get(target)
  if (exist) {
    exist.send(msg)
  }
}

const setAndBroadcast = (k: string, v: connection) => {
  broadcastWithout(k, `new connection ${k}`)
  return pool.set(k, v)
}
const deleteAndBroadcast = (k: string) => {
  if (pool.delete(k)) {
    broadcast(`connection ${k} closed`)
    return true
  }
  return false
}
const poolGet = (k: string) => pool.get(k)

const poolProxy: ProxyHandler<WsConPool> = {
  get(target: WsConPool, p: string | symbol, receiver: any): any {
    switch (p) {
      case 'set': return setAndBroadcast
      case 'delete': return deleteAndBroadcast
      case 'get': return poolGet
      default:
        const member = Reflect.get(target, p, receiver)
        if (typeof member === 'function')
          return member.bind(pool)
        return member
    }
  }
}
const POOL = new Proxy(pool, poolProxy)

export {
  POOL,
  broadcast,
  p2p
}
