import { router } from '../service/koa'
import { getAllList } from "../data/redis";
import {context as appContext} from '../service/context'


let itemsCache: Buffer = null

router.get('/ehs', async (context) => {
  if (appContext.updated) {
    const items = await getAllList('eh', 0, -1) as string[]
    itemsCache = Buffer.alloc(0, `[${items.join(',')}]`)
    appContext.updated = false
    context.status = 200
  } else {
    context.status = 304
  }
  context.set('Content-Type', 'application/json')
  context.set('Access-Control-Allow-Origin', '*')
  context.set('Cache-Control', 'no-cache, max-age=0')
  context.body = itemsCache
})
