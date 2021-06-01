import * as Koa from 'koa'
import * as Router from "koa-router"

const app = new Koa
const router = new Router

import '../app/routes'

type KoaConfig = {
  port: number
}

const config = require('../config/app.config.json') as KoaConfig

function finalRouter() {
  app.use(router.routes())
    .use(router.allowedMethods())
}

export {
  finalRouter,
  app,
  router
}
