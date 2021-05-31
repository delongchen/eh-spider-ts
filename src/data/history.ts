import { del, diffSet, addToSet } from "./redis";

const TEMP = 'temporary'
export const HISTORY = 'ehhistory'

export async function getDiffSet(newKeys: string[]): Promise<string[]> {
  await del(TEMP)
  await addToSet(TEMP, newKeys)
  const diff = await diffSet(TEMP, HISTORY) as string[]
  await addToSet(HISTORY, diff)
  return diff
}
