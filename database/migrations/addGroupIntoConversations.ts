import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddGroupIdToConversations extends BaseSchema {
  protected tableName = 'conversations'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.integer('group_id').unsigned().references('id').inTable('groups').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('group_id')
    })
  }
}