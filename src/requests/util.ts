import fetch, {
  Headers,
  RequestInit,
  FetchError
} from "node-fetch"

import {sleepTick} from "../util";

const headers = new Headers()

const reqOpt: RequestInit = {
  headers,
  timeout: 5000
}

const getPage = () => {
  console.log('start get EH')

  return fetch('https://e-hentai.org/popular', reqOpt)
    .then(res => res.text())
    .catch((reason: FetchError) => {
      console.log('retry EH')
      return null
    })
}

export async function getEhPopularPage(): Promise<string> {
  let result: string = await getPage()

  while (!result) {
    await sleepTick(60)
    result = await getPage()
  }

  return result
}
