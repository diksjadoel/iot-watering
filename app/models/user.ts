import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto' 
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, beforeSave, beforeCreate } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('bcrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})
export default class User extends compose(BaseModel, AuthFinder) {
  static primaryKey = 'id'
  @column({ isPrimary: true, columnName: 'id' })
  declare id: string

  @column({ columnName: 'full_name' }) 
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
    
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1h',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
    storageKey: 'auth_access_tokens',
  })

  static refreshTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'ref_',
    table: 'auth_refresh_tokens',
    type: 'refresh_token',
    tokenSecretLength: 40,
    storageKey: 'auth_refresh_tokens',
  })
}
