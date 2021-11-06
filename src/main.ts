import { startEhSpider } from './service/eh'
import { httpServer } from "./service/koa";
import { cover } from './service/ws/ws'
import { wsRouter } from './service/ws/router'
import { initApp } from "./core/initApp";
import config from './config'

const koaConfig = config.app

async function start() {
  await initApp()

  startEhSpider().then(() => console.log('end'))

  const wsServer = cover(httpServer)
  wsRouter.attachServer(wsServer)

  httpServer.listen(koaConfig.port, () => {
    console.log(`${new Date} Server is listening on port ${koaConfig.port}`)
  })
}

start().then(() => {
  console.log('-')
})
