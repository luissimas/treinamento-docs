import { Model } from 'objection'
import { PetModel } from './pet'

export class UserModel extends Model {
  public readonly id!: string
  public readonly name!: string
  public readonly age!: number
  public readonly email!: string
  public readonly password!: string

  public readonly pets!: PetModel[]

  static get tableName() {
    return 'user'
  }

  static get relationMappings() {
    return {
      pets: {
        relation: Model.HasManyRelation,
        modelClass: PetModel,
        join: {
          from: 'user.id',
          to: 'pet.id_user',
        },
      },
    }
  }
}
