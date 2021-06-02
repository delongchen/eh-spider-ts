import { startEhSpider } from './service/eh'
import { app, finalRouter } from "./service/koa";
import { EhHTMLParser } from './parser/EhHTMLParser'
import { getEhPopularPage } from "./requests/util";
import { closeClient } from './data/redis'


function start() {
  startEhSpider().then(() => console.log('end'))
  finalRouter()
  app.listen(11451)
}

start()
