import config from '../config'
import {readdir, mkdir} from 'fs/promises'

export async function initApp(): Promise<void> {
  const coverPath = await readdir(config.app.coverPath)
    .then(() => true)
    .catch(err => false)

  if (!coverPath) {
    await mkdir(config.app.coverPath)
  }
}
