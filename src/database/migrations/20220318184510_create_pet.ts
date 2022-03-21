import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pet', table => {
    table.string('id').primary()

    table.string('id_user').notNullable()
    table.foreign('id_user').references('id').inTable('user').onDelete('CASCADE')

    table.string('name').notNullable()
    table.string('animal').notNullable()
    table.integer('age').notNullable().unsigned()

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('pet')
}
