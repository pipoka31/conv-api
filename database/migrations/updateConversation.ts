import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateUsersTable extends BaseSchema {
  protected tableName = 'conversations'

  public async up() {
    this.schema.table(this.tableName, (table) => {
        table.renameColumn('id_userSender','id_user_sender')
        table.renameColumn('id_userReciever','id_user_reciever')
    
    })
  }
}