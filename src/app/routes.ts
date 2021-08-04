import { router } from '../service/koa'
import { getAllList } from "../data/redis";
import {context} from '../service/context'
import { createLogger } from 'bunyan'

const log = createLogger({name: 'routes', level: 'debug'})

let itemsCache: Buffer = null

router.get('/ehs', async (con) => {
  if (context.updated) {
    const items = await getAllList('eh', 0, -1) as string[]
    itemsCache = Buffer.from(`[${items.join(',')}]`)
    context.updated = false
  }
  con.set('Content-Type', 'application/json')
  con.set('Access-Control-Allow-Origin', '*')
  con.set('Cache-Control', 'no-cache, max-age=600')
  con.body = itemsCache
})
