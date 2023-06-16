import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateUsersTable extends BaseSchema {
  protected tableName = 'conversations'

  public async up() {
    this.schema.table(this.tableName, (table) => {
        table.renameColumn('dateUpdate','date_update')
       
    
    })
  }
}