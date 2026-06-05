import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class LogWatering extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'device_id' })
  declare deviceId: number

  @column({ columnName: 'schedule_id' })
  declare scheduleId: number | null

  // TIME di Postgres dipetakan sebagai string ("HH:MM:SS") di JavaScript
  @column({ columnName: 'start_time' })
  declare startTime: string 

  // INTEGER sesuai struktur SQL barumu
  @column({ columnName: 'end_time' })
  declare endTime: number 

  @column()
  declare metode: string

  @column({ columnName: 'log_waterings_status' })
  declare logWateringsStatus: 'is_active' | 'is_unactive'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}