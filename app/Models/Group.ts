import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Group extends BaseModel {
  public static table = 'groups'

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_1: number

  @column()
  public user_2: number

  // Timestamps
  public static readonly createdAtColumn = 'created_at'
  public static readonly updatedAtColumn = 'updated_at'
}
