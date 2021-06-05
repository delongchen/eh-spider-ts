import { startEhSpider } from './service/eh'
import { httpServer, koaConfig } from "./service/koa";


function start() {
  startEhSpider().then(() => console.log('end'))

  httpServer.listen(koaConfig.port, () => {
    console.log(`${new Date} Server is listening on port ${koaConfig.port}`)
  })
}

start()
