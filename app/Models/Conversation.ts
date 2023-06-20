
import { DateTime } from 'luxon'
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Conversation extends BaseModel{

  @column({isPrimary: true})
  public id: number

  @column()
  public id_user_sender: number

  @column()
  public id_user_reciever: number

  @column()
  public id_message: number

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public date_update: DateTime
}