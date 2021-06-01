import { startEhSpider } from './service/eh'
import { app, finalRouter } from "./service/koa";


startEhSpider()

finalRouter()
app.listen(11451)
