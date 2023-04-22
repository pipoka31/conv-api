import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public name:string

  @column()
  public password:string
  
  @column()
  public username:string

  @column()
  public active:boolean

  @column.dateTime({autoCreate: true})
  public createAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updateAt: DateTime

  @beforeSave()
  public static async hashPassword(user:User){
    if(user.password){
      user.password = await Hash.make(user.password)
    }
  }
}