import {closePool} from './MysqlConn'
import { insert } from './utils'
import {EhItem} from "../../types/eh";

export async function insertEhItem(records: EhItem[]) {
  const toInsert = records
    .map(item => {
      const { id, time } = item.published
      return [
        id,
        item.tag,
        new Date(time ? time: Date.now()),
        JSON.stringify(item)
      ]
    })

  await insert('eh_items', toInsert)
  await closePool()
}
