import { DateTime } from 'luxon'
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Message extends BaseModel{

  @column({isPrimary: true})
  public id: number

  @column()
  public id_user: number

  @column()
  public text: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime
}