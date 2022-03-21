import { Model } from 'objection'

export class PetModel extends Model {
  public readonly id!: string
  public readonly id_user!: string
  public readonly name!: string
  public readonly animal!: string
  public readonly age!: number

  static get tableName() {
    return 'pet'
  }
}
