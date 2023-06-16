import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateUsersTable extends BaseSchema {
  protected tableName = 'messages'

  public async up() {
    this.schema.table(this.tableName, (table) => {
        table.renameColumn('createdAt','created_at')    
    })
  }
}