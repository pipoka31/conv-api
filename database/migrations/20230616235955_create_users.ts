import BaseSchema from '@ioc:Adonis/Lucid/Schema'


export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.timestamp('created_at').defaultTo(this.now()) // Adicione esta linha
      table.timestamp('updated_at').defaultTo(this.now())
      table.string('userName')
    })
  }

  public async down() {
    this.schema.dropTable('users')
  }
}