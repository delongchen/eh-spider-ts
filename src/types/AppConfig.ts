import { ClientOpts } from 'redis'

type KoaConfig = {
  port: number,
  coverPath: string
}

type MysqlConfig = {
  host: string,
  user: string,
  password: string,
  database: string,
  port: number
}

export interface AppConfig {
  app: KoaConfig,
  sql: MysqlConfig,
  redis: ClientOpts
}
