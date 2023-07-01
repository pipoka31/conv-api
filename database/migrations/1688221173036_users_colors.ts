import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateUsersTable extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.text('color').defaultTo("").notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
