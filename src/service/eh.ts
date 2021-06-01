import {parseEhPopularPage} from "../parser/EhHTMLParser";
import {getEhPopularPage} from "../requests/util";
import {addEhItemsToRedis} from "../data/eh";

import { context } from "./context";
import { sleepTick } from "../util";

const jetOne = () => getEhPopularPage()
  .then(parseEhPopularPage)
  .then(addEhItemsToRedis)

export async function startEhSpider() {
  while (!context.err) {
    await jetOne().catch((err) => {
      console.log(err)
      context.err = true
    })
    await sleepTick(60 * 60)
  }
}
