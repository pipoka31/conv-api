import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateGroupsTable extends BaseSchema {
  protected tableName = 'groups'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_1').unsigned().notNullable()
      table.integer('user_2').unsigned().notNullable()
      table.timestamps(true, true)

      table.foreign('user_1').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('user_2').references('id').inTable('users').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}


// ALTER TABLE groups
// ADD CONSTRAINT fk_user_1
// FOREIGN KEY (user_1) REFERENCES users (id)
// ON DELETE CASCADE;

// ALTER TABLE groups
// ADD CONSTRAINT fk_user_2
// FOREIGN KEY (user_2) REFERENCES users (id)
// ON DELETE CASCADE;