import { router } from '../service/koa'
import { getAllList } from "../data/redis";


let itemsCache: Buffer = null
let updateTime: number = Date.now() + 3600 * 1000

router.get('/ehs', async (context) => {
  const reqTime = Date.now()
  if (itemsCache === null || updateTime < reqTime) {
    const items = await getAllList('eh', 0, -1) as string[]
    itemsCache = new Buffer(`[${items.join(',')}]`)
    updateTime =  reqTime + 3600 * 1000
    context.status = 200
  } else {
    context.status = 304
  }
  context.set('Content-Type', 'application/json')
  context.set('Access-Control-Allow-Origin', '*')
  context.set('Cache-Control', 'no-cache, max-age=0')
  context.body = itemsCache
})
