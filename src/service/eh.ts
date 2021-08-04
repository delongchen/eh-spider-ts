import {getEhPopularPage} from "../requests/util";
import {getDiffItems} from "../data/eh";
import { EhHTMLParser } from '../parser/EhHTMLParser'
import { runEhPlugins } from "../plugin/eh";
import { context } from "./context";
import { sleepTick } from "../util";

const jetOne = () => getEhPopularPage()
  .then(html => new EhHTMLParser(html).parse())
  .then(getDiffItems)
  .then(runEhPlugins)

export async function startEhSpider() {
  while (!context.err) {
    await jetOne().catch((err) => {
      console.log(err)
      context.err = true
    })
    context.updated = true
    await sleepTick(60 * 60)
  }
}
