import {getConnection} from './MysqlConn'
import {MysqlError, PoolConnection, QueryOptions} from "mysql";
import {createLogger} from "bunyan";
import {writeFile, readFile} from 'fs/promises'


const log = createLogger({name: 'MysqlUtils'})
const errItems: string[] = []

function query(connection: PoolConnection, options: string | QueryOptions, values: unknown): Promise<void | MysqlError> {
  return new Promise<void>((resolve, reject) => {
    connection.query(options, values, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

export async function queryWithTran(options: string | QueryOptions, values: unknown): Promise<void> {
  const connection = await getConnection()
  await beginTransaction(connection)
  const err = await query(connection, options, values).catch(reason => reason)
  if (err) {
    await rollback(connection)
    errItems.push(values[3])
    throw err
  } else {
    await commit(connection)
  }
}

function transactionPromise(fn: string, release = false): (connection: PoolConnection) => Promise<void> {
  return (connection) => new Promise((resolve, reject) => {
    connection[fn].call(connection, err => {
      if (release) connection.release()
      if (err) reject(err)
      else resolve()
    })
  })
}

const beginTransaction = transactionPromise('beginTransaction')
const rollback = transactionPromise('rollback', true)
const commit = transactionPromise('commit', true)

export async function insert(table: string, values: any[]) {
  const sql = `insert into ${table} (id, tag, time, json) values (?, ?, ?, ?)`

  await values
    .map(it => queryWithTran(sql, it).catch((reason: MysqlError) => {
      console.log(reason.sqlMessage)
    }))
    .reduce((pre, cur) => {
      return pre
        .then(() => cur)
        .catch(reason => {
          console.log(reason)
        })
    }, Promise.resolve())

  if (errItems.length) {
    const errJSONPath = `${process.cwd()}/ehs.json`
    const ehsJSON = await readFile(errJSONPath, 'utf-8')
    const ehs = JSON.parse(ehsJSON) as string[]
    errItems.forEach(it => void ehs.push(it))
    await writeFile(errJSONPath, `[${ehs.join(',')}]`)
    errItems.length = 0
  }
}
