import {getEhPopularPage} from "../requests/util";
import {addEhItemsToRedis} from "../data/eh";
import { EhHTMLParser } from '../parser/EhHTMLParser'

import { context } from "./context";
import { sleepTick } from "../util";

const jetOne = () => getEhPopularPage()
  .then(html => new EhHTMLParser(html).parse())
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
