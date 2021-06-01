import { router } from '../service/koa'
import { getAllList } from "../data/redis";

router.get('/ehs', async (context) => {
  const items = await getAllList('eh', 0, -1) as string[]
  context.body = `[${items.join(',')}]`
})
