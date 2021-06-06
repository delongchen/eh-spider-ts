import {EhPlugin} from './EhPlugin'
import fetch from "node-fetch";
import {defReqOpt} from '../../requests/def'
import {createWriteStream, WriteStream} from "fs";
import {addToSet} from "../../data/redis";

const savePath = 'C:\\Users\\cdlfg\\WebstormProjects\\eh-spider-ts\\out\\cover'
const savePathPi = '/usr/share/nginx/html/eh/cover'

function streamFinished(stream: WriteStream) {
  return new Promise(res => {
    stream.on('finish', res)
  })
}

export const saveCover: EhPlugin = (items) => {
  const saved: string[] = []
  const failed: string[] = []

  const ps = items.map(ehItem => {
    const {
      published: {
        id, imgSrc
      }
    } = ehItem

    return fetch(imgSrc, defReqOpt)
      .then(res => {
        const writeStream = createWriteStream(`${savePath}\\${id}.jpg`)
        res.body.pipe(writeStream)
        return streamFinished(writeStream)
      })
      .catch(reason => {
        failed.push(id + '')
        return ehItem
      })
  })

  const concurrent = ps.reduce((pre, cur) => {
    return pre.then(() => cur)
  }, Promise.resolve())

  return concurrent
    .then(() => addToSet('ehCovers', saved))
    .then(() => {
      saved.forEach(name => console.log(name))
      console.log('saved')
      if (failed.length) {
        failed.forEach(name => console.log(name))
        console.log('failed')
      }
    })
}
