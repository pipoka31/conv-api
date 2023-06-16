import BaseSchema from '@ioc:Adonis/Lucid/Schema'


export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('user_name')
    })
  }

  public async down() {
    this.schema.dropTable('users')
  }
}