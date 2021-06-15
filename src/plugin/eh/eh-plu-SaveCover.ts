import {EhPlugin} from './EhPlugin'
import fetch, { Response } from "node-fetch";
import {defReqOpt} from '../../requests/def'
import {createWriteStream, WriteStream} from "fs";
import {addToSet} from "../../data/redis";

const savePath = 'C:\\Users\\cdlfg\\WebstormProjects\\eh-spider-ts\\out\\cover'
const savePathPi = '/usr/share/nginx/html/eh/cover'

export const saveCover: EhPlugin = (items) => {
  const concurrent = items.map(ehItem => {
    const {
      published: {
        id, imgSrc
      }
    } = ehItem

    return fetch(imgSrc, defReqOpt).then(res => res.blob())
  })
}
