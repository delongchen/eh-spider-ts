import {EhPlugin} from '../../types/EhPlugin'
import {insertEhItem} from '../../data/mysql'

export const ehPluInsertToTable: EhPlugin = {
  name: 'InsertToMysql',
  handler: insertEhItem,
  onErr: (err, ehs) => {
    console.log(err)
  }
}
