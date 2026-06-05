import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'schedules'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_device').notNullable().references('id').inTable('devices').onDelete('cascade');
      table.time('clock_start').notNullable();
      table.string('day_active', 100).notNullable()
      table.boolean('is_active').defaultTo(false).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}