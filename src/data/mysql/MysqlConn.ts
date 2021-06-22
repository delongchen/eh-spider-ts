import { createPool, PoolConnection } from 'mysql'
import { createLogger } from 'bunyan'

const log = createLogger({ name: 'MysqlConnections' })

type MysqlConfig = {
  host: string,
  user: string,
  password: string,
  database: string
}

const mysqlConfig = require('../../config/mysql.config.json') as MysqlConfig

const mysqlConnectionPool = createPool({
  connectionLimit: 10,
  ...mysqlConfig
})

export function getConnection(): Promise<PoolConnection> {
  return new Promise((resolve, reject) => {
    log.debug('get poolConnction')
    mysqlConnectionPool.getConnection((err, connection) => {
      if (err) {
        log.error('get poolConnection err')
        reject(err)
      } else {
        log.debug('get poolConnection succses')
        resolve(connection)
      }
    })
  })
}

export function closePool(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    log.debug('closing pool')
    mysqlConnectionPool.end(err => {
      if (err) {
        log.error('closing pool err')
        reject(err)
      } else {
        log.debug('closing pool succses')
        resolve()
      }
    })
  })
}
