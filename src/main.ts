import Koa = require('koa')
import { jetOne } from "./service/eh";
import { Context } from "./types/context";

const tick: number = 1000
const context: Context = {
  closed: false,
  err: false
}

const sleep = (t: number) => new Promise(resolve => void setTimeout(resolve, t))

const sleepTick = async (n: number) => {
  for (let i = 0; i < n; i++) {
    if (context.err) break
    await sleep(tick)
  }
}

async function main() {
  while (!context.closed) {
    await jetOne().catch((err) => {
      console.log(err)
      context.closed = true
    })
    console.log(`jet at ${Date.now()}`)
    await sleepTick(60 * 60)
  }
}

main().then(() => console.log('started'))
