import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'log_waterings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('device_id')
        .unsigned()
        .references('id')
        .inTable('devices')
        .onDelete('CASCADE') // Jika perangkat dihapus, riwayatnya ikut terhapus
        .notNullable()
      table
        .integer('schedule_id')
        .unsigned()
        .references('id')
        .inTable('schedules')
        .onDelete('SET NULL') // Jika jadwal dihapus, riwayat tidak hilang, tapi kolom ini jadi NULL
        .nullable()

      // waktu_mulai (DATETIME)
      table.time('start_time').notNullable()

      // waktu_selesai (DATETIME)
      table.integer('end_time').notNullable()

      // metode (ENUM: 'Otomatis_RTC', 'Manual_Aplikasi')
      table.enum('metode', ['Otomatis_RTC', 'Manual_Aplikasi']).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}