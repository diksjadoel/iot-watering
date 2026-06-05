import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'id_device' })
  declare idDevice: number

  @column({ columnName: 'clock_start' })
  declare clockStart: string

  @column({ columnName: 'day_active' })
  declare dayActive: string

  @column({ columnName: 'is_active' })
  declare isActive: boolean

  @column({ columnName: 'end_minute' })
  declare endMinute: number

  @column({ columnName: 'is_watering' })
  declare isWatering: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}