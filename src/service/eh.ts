import {parseEhPopularPage} from "../parser/EhHTMLParser";
import {getEhPopularPage} from "../requests/util";
import {closeClient} from "../data/redis";
import {addEhItemsToRedis} from "../data/eh";


export const jetOne = () => getEhPopularPage()
  .then(parseEhPopularPage)
  .then(addEhItemsToRedis)
  .then(closeClient)
