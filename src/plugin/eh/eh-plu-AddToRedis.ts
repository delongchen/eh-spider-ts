import {EhPlugin} from './EhPlugin'
import {addToList} from "../../data/redis";

const EH = 'eh'

export const ehPluAddToRedis: EhPlugin = {
  name: 'AddToRedis',
  handler: (async ehs => {
    await addToList(EH, ehs.map(it => JSON.stringify(it)))
  }),
  onErr: err => {
    console.log(err)
  }
}
