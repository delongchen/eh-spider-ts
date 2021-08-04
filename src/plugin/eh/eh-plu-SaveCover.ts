import {EhPlugin} from './EhPlugin'
import fetch, {FetchError} from "node-fetch";
import {EhItem} from "../../types/eh";
import {sliceArrayBy, sleep} from "../../util";
import {createWriteStream, promises} from 'fs'
import config from '../../config'

const savePath = config.app.coverPath

export const saveCover: EhPlugin = {
  name: 'SaveCover',
  handler: saveCoversPre10,
  onErr: err => {
    console.log(err)
  }
}

function fetchOneCover(eh: EhItem) {
  const {
    published: {
      id, imgSrc
    }
  } = eh

  const f = createWriteStream(`${savePath}/${id}.jpg`)
  return fetch(imgSrc)
    .then(value => value.body)
    .then(body => new Promise<void>((resolve, reject) => {
      body.pipe(f)
      body.on('error', reject)
      f.on('finish', resolve)
    }))
    .catch((err: FetchError) => {
      //todo
      console.log(id)
    })
}

async function concurrentCovers(ehs: EhItem[]) {
  let root = Promise.resolve()

  for (const eh of ehs) {
    root = root.then(() => fetchOneCover(eh))
  }

  return root
}

async function saveCoversPre10(ehs: EhItem[]) {
  const limit = 10
  const tasks = sliceArrayBy(ehs, limit)
  let n = ehs.length
  console.log(`start saving covers total: ${ehs.length}`)

  for (const task of tasks) {
    await concurrentCovers(task)
    console.log(n -= task.length)
    await sleep(1000)
  }
}

async function updateCoversIndex() {
  const indexFile = `${savePath}/index.json`

  const index = await promises.readFile(indexFile, 'utf-8')
    .catch(err => {
      if (err.code === 'ENOENT') {
        return '[]'
      } else throw err
    })
    .then(text => JSON.parse(text) as number[])
  const indexSet = new Set<number>(index)

  for await (const dirent of await promises.opendir(savePath)) {
    if (!dirent.isFile()) continue
    const name = dirent.name.split('.')
    if (name[1] === 'jpg') {
      const id = +name[0]
      if (!indexSet.has(id)) index.push(id)
    }
  }

  await promises.writeFile(indexFile, JSON.stringify(index))
}
