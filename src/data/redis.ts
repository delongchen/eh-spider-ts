import {
  ClientOpts,
  RedisClient,
  createClient
} from 'redis'


const options = require("../config/redis.config.json") as ClientOpts

let client: RedisClient = null

function createRedisClient(): RedisClient {
  return createClient(options)
}

export function getRedisClientInstance(): RedisClient {
  if (client) {
    if (client.connected) {
      return client
    } else {
      client.quit()
    }
  }

  return (client = createRedisClient())
}

export async function closeClient() {
  await new Promise<void>(resolve => {
    getRedisClientInstance().quit(() => {
      client = null
      resolve()
    })
  })
  console.log('closed')
}

export function handleWithPromise(fnName: string): (...args: any) => Promise<any> {
  const fn = getRedisClientInstance()[fnName]

  if (fn && typeof fn === 'function') {
    return (...args) => new Promise<any>((resolve, reject) => {
      fn.call(getRedisClientInstance(), ...args, (err, reply) => {
        if (err) reject()
        else resolve(reply)
      })
    })
  }

  return async () => {
    throw new Error('boom')
  }
}

const addToSet = handleWithPromise('sadd')
const del = handleWithPromise('del')
const diffSet = handleWithPromise('sdiff')
const addToList = handleWithPromise('lpush')
const getAllList = handleWithPromise('lrange')

export {
  addToSet,
  del,
  diffSet,
  addToList,
  getAllList
}
