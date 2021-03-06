import { knex } from 'knex'
import knexfile from '../../knexfile'
import { Model } from 'objection'

export function setup() {
  const database = knex(knexfile)

  Model.knex(database)
}
