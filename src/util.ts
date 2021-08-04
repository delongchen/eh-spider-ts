import {context} from "./service/context";

export const sleep = (t: number) => new Promise(resolve => void setTimeout(resolve, t))

const tick: number = 1000

export const sleepTick = async (n: number) => {
  for (let i = 0; i < n; i++) {
    if (context.err) break
    await sleep(tick)
  }
}

export function sliceArrayBy<T>(array: T[], limit: number): T[][] {
  const result: T[][] = []
  const len = array.length

  if (limit >= len) return [array]
  else {
    let now = 0
    while (now < array.length)
      result.push(array.slice(now, now += limit))

    return result
  }
}

