import fetch, {FetchError, Response} from "node-fetch"
import {createWriteStream} from 'fs'
import {sleepTick} from "../util";
import {defReqOpt} from './def'

const getPage = () => {
  console.log('start get EH')

  return fetch('https://e-hentai.org/popular', defReqOpt)
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
