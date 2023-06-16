import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public name:string
  
  @column()
  public user_name:string

  @column()
  public password:string

  @column()
  public active:boolean

  @column.dateTime({autoCreate: true})
  public created_at: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updated_at: DateTime

  @beforeSave()
  public static async hashPassword(user:User){
    if(user.password){
      user.password = await Hash.make(user.password)
    }
  }
}