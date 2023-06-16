import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateUsersTable extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
        table.dropColumn('user_name')
        table.dropColumn('created_at')
        table.dropColumn('updated_at')
    
    })
  }
}
