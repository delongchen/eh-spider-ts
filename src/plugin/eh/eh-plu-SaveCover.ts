import {EhPlugin} from './EhPlugin'
import fetch from "node-fetch";
import {defReqOpt} from '../../requests/def'
import {createWriteStream} from "fs";
import { addToSet } from "../../data/redis";

const savePath = 'C:\\Users\\cdlfg\\WebstormProjects\\eh-spider-ts\\out\\cover'

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
        writeStream.on('finish', () => {
          saved.push(id + '')
        })
        res.body.pipe(writeStream)
        return ehItem
      })
      .catch(reason => {
        failed.push(id + '')
        return ehItem
      })
  })

  return ps.reduce((pre, cur) => {
    return pre.then(() => cur)
      .then((ehItem) => {
        console.log(`finished ${ehItem.title.title}`)
      }, reason => {
        console.log('fuck it')
      })
  }, Promise.resolve())
    .then(() => addToSet('ehCovers', saved))
    .then(() => {
      saved.forEach(console.log)
      console.log('saved')
      if (failed.length) {
        failed.forEach(console.log)
        console.log('failed')
      }
    })
}
