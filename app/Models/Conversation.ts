
import { DateTime } from 'luxon'
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Conversation extends BaseModel{

  @column({isPrimary: true})
  public id: number

  @column()
  public id_userSender: number

  @column()
  public id_userReciever: number

  @column()
  public id_message: number

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public dateUpdate: DateTime
}