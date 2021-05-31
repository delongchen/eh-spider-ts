import {EhItem} from "../types/eh";
import { addToList, del } from './redis'
import { getDiffSet, HISTORY } from './history'

const EH = 'eh'

export async function addEhItemsToRedis(items: EhItem[]): Promise<EhItem[]> {
  const itemMap: {[k: string]: EhItem} = Object.create(null)
  items.forEach(item => void (itemMap[item.published.id] = item))

  const diff = await getDiffSet(Object.keys(itemMap))
  const diffItem = diff.map(it => itemMap[it])
  await addToList(EH, diffItem.map(it => JSON.stringify(it)))

  console.log(`add ${diffItem.length}`)
  return diffItem
}

export async function resetEh(really: boolean = true) {
  if (!really) return
  await del(HISTORY)
  await del(EH)
}
