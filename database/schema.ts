
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export class AuthAccessTokenSchema extends BaseModel {
  static $columns = ['abilities', 'createdAt', 'expiresAt', 'hash', 'id', 'lastUsedAt', 'name', 'tokenableId', 'type', 'updatedAt'] as const
  $columns = AuthAccessTokenSchema.$columns
  @column()
  declare abilities: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null
  @column.dateTime()
  declare expiresAt: DateTime | null
  @column()
  declare hash: string
  @column({ isPrimary: true })
  declare id: number
  @column.dateTime()
  declare lastUsedAt: DateTime | null
  @column()
  declare name: string | null
  @column()
  declare tokenableId: number
  @column()
  declare type: string
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export class DeviceSchema extends BaseModel {
  static $columns = ['createdAt', 'deviceName', 'deviceStatus', 'id', 'updatedAt'] as const
  $columns = DeviceSchema.$columns
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null
  @column()
  declare deviceName: string | null
  @column()
  declare deviceStatus: string | null
  @column({ isPrimary: true })
  declare id: number
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export class LogWateringSchema extends BaseModel {
  static $columns = ['createdAt', 'deviceId', 'endTime', 'id', 'logWateringsStatus', 'metode', 'scheduleId', 'startTime', 'updatedAt'] as const
  $columns = LogWateringSchema.$columns
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null
  @column()
  declare deviceId: number
  @column()
  declare endTime: number
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare logWateringsStatus: string
  @column()
  declare metode: string
  @column()
  declare scheduleId: number | null
  @column()
  declare startTime: string
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export class ScheduleSchema extends BaseModel {
  static $columns = ['clockStart', 'createdAt', 'dayActive', 'endMinute', 'id', 'idDevice', 'isActive', 'isWatering', 'updatedAt'] as const
  $columns = ScheduleSchema.$columns
  @column()
  declare clockStart: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null
  @column()
  declare dayActive: string
  @column()
  declare endMinute: number
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare idDevice: number
  @column()
  declare isActive: boolean
  @column()
  declare isWatering: boolean
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export class UserSchema extends BaseModel {
  static $columns = ['createdAt', 'email', 'fullName', 'id', 'password', 'updatedAt'] as const
  $columns = UserSchema.$columns
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column()
  declare email: string
  @column()
  declare fullName: string | null
  @column({ isPrimary: true })
  declare id: number
  @column({ serializeAs: null })
  declare password: string
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
