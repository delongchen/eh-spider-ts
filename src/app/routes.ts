import { router } from '../service/koa'
import { getAllList } from "../data/redis";

router.get('/ehs', async (context) => {
  const items = await getAllList('eh', 0, -1) as string[]
  context.set('Content-Type', 'application/json')
  context.set('Access-Control-Allow-Origin', '*')
  context.body = `[${items.join(',')}]`
})
