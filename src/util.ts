import {context} from "./service/context";
import {EhItem} from "./types/eh";
import fetch from "node-fetch";

export const sleep = (t: number) => new Promise(resolve => void setTimeout(resolve, t))

const tick: number = 1000

export const sleepTick = async (n: number) => {
  for (let i = 0; i < n; i++) {
    if (context.err) break
    await sleep(tick)
  }
}
