// Update with your config settings.
import { Knex } from 'knex'

import 'dotenv/config'

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/db.sqlite3',
  },
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: './src/database/seeds',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
  useNullAsDefault: true,
}

export default config
