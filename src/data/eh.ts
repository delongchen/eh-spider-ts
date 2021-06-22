import {EhItem} from "../types/eh";
import { addToList, del, setManyHash } from './redis'
import { getDiffSet, HISTORY } from './history'
import { insertEhItem } from './mysql'

const EH = 'eh'
const EHT = 'eht'

export async function addEhItemsToRedis(items: EhItem[]): Promise<EhItem[]> {
  const itemMap: {[k: string]: EhItem} = Object.create(null)
  items.forEach(item => void (itemMap[item.published.id] = item))

  const diff = await getDiffSet(Object.keys(itemMap))

  if (diff.length) {
    const itemJSONs: string[] = []
    const itemHash: string[] = []
    const diffItem: EhItem[] = []

    for (const i of diff) {
      const target = itemMap[i]
      const itemJSON = JSON.stringify(target)

      itemJSONs.push(itemJSON)
      diffItem.push(target)
      itemHash.push(i)
      itemHash.push(itemJSON)
    }

    await addToList(EH, itemJSONs)
    await setManyHash(EHT, itemHash)
    await insertEhItem(diffItem)
    console.log(`add ${diffItem.length}`)
    return diffItem
  }

  return []
}

export async function resetEh(really: boolean = true) {
  if (!really) return
  await del(HISTORY)
  await del(EH)
}
