import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'log_waterings'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('log_waterings_status',['is_active','is_unactive']).notNullable().defaultTo('is_unactive')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Menghapus kolom jika migration di-rollback
      table.dropColumn('log_waterings_status')
    })
  }
}