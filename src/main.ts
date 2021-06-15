import { startEhSpider } from './service/eh'
import { httpServer, koaConfig } from "./service/koa";
import { cover } from './service/ws/ws'


function start() {
  startEhSpider().then(() => console.log('end'))

  const wsServer = cover(httpServer)

  httpServer.listen(koaConfig.port, () => {
    console.log(`${new Date} Server is listening on port ${koaConfig.port}`)
  })
}

start()
