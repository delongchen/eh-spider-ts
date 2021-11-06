import {EhPlugin} from '../../types/EhPlugin'
import {setManyHash} from '../../data/redis'

const EHT = 'eht'

export const ehPluAddMHash: EhPlugin = {
  name: 'AddToMHash',
  handler: (async ehs => {
    const toInsert: string[] = []

    for (const ehItem of ehs) {
      toInsert.push(ehItem.published.id + '')
      toInsert.push(JSON.stringify(ehItem))
    }

    await setManyHash(EHT, toInsert)
  }),
  onErr: err => {
    console.log(err)
  }
}
