import * as Koa from 'koa'
import * as Router from "koa-router"
import { createServer } from 'http'

const app = new Koa
const router = new Router

//import '../app/routes'

type KoaConfig = {
  port: number
}

export const koaConfig = require('../config/app.config.json') as KoaConfig

function finalRouter() {
  app.use(router.routes())
    .use(router.allowedMethods())
}

finalRouter()

const httpServer = createServer(app.callback())

export {
  app,
  router,
  httpServer
}
