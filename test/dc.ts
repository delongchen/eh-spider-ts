import { promises } from 'fs'
import { addToSet, closeClient } from "../src/data/redis";

const { readdir } = promises

async function TestC() {
  const toAdd: string[] = []
  await readdir('/usr/share/nginx/html/eh/cover', {withFileTypes: true})
    .then(files => {
      for (const file of files) {
        if (file.isFile()) {
          toAdd.push(file.name.split('.')[0])
        }
      }
    })
  await addToSet('ehCovers', toAdd)
}


