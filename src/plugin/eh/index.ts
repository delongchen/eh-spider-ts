import {EhItem} from "../../types/eh";
import { EhPlugin } from "./EhPlugin";

import { saveCover } from "./eh-plu-SaveCover";
import { ehPluAddMHash } from "./eh-plu-AddMHash";
import { ehPluAddToRedis } from './eh-plu-AddToRedis'
import {ehPluInsertToTable} from './eh-plu-InsertToTable'

const plugins: EhPlugin[] = [
  ehPluAddMHash,
  ehPluAddToRedis,
  ehPluInsertToTable,
  saveCover
]

export async function runEhPlugins(items: EhItem[]) {
  console.log(`get ${items.length} new item from page`)

  let tasks = Promise.resolve()
  for (const plugin of plugins) {
    tasks = tasks
      .then(() => plugin.handler(items))
      .then(() => {
        console.log(`${plugin.name} finished`)
      })
      .catch(reason => {
        plugin.onErr(reason, items)
      })
  }

  await tasks
}
