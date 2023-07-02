import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'conversations'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.integer('group_id')
      table.foreign('group_id').references('id').inTable('groups').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
