import {EhItem} from "../types/eh";
import { getDiffSet } from './history'

export async function getDiffItems(items: EhItem[]): Promise<EhItem[]> {
  const itemMap: {[k: string]: EhItem} = Object.create(null)

  items.forEach(item => void (itemMap[item.published.id] = item))

  const diff = await getDiffSet(Object.keys(itemMap))

  return diff.length ? diff.map(it => itemMap[it]) : []
}
