import { Knex } from 'knex'
import { v4 as uuid } from 'uuid'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('pet').del()

  const camus = await knex('user').where({ name: 'Albert Camus' }).select('id').first()
  const fernando = await knex('user').where({ name: 'Fernando Pessoa' }).select('id').first()

  const pets = [
    {
      id: uuid(),
      id_user: fernando.id,
      name: 'Jorge',
      animal: 'Salamandra',
      age: 7,
    },
    {
      id: uuid(),
      id_user: camus.id,
      name: 'Sifão',
      animal: 'Cachorro',
      age: 4,
    },
  ]

  // Inserts seed entries
  await knex('pet').insert(pets)
}
