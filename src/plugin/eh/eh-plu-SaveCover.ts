import {EhPlugin} from './EhPlugin'
import fetch from "node-fetch";
import {defReqOpt} from '../../requests/def'
import {createWriteStream} from "fs";

const savePath = 'C:\\Users\\cdlfg\\WebstormProjects\\eh-spider-ts\\out\\cover'
const savePathPi = '/usr/share/nginx/html/eh/cover'

export const saveCover: EhPlugin = (items) => {
  const ps = items.map(ehItem => {
    const {
      published: {
        id, imgSrc
      }
    } = ehItem

    return fetch(imgSrc, defReqOpt)
      .then(res => {
        const writeStream = createWriteStream(`${savePathPi}\\${id}.jpg`)
        writeStream.on('finish', () => {
          console.log(`saved ${id}`)
        })
        res.body.pipe(writeStream)
        return ehItem
      })
      .catch(reason => {
        console.log(`fetch error ${id}`)
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
}
