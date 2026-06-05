import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',

  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST', '127.0.0.1'),
        port: Number(env.get('DB_PORT', 5432)),
        user: env.get('DB_USER', 'postgres'),
        password: env.get('DB_PASSWORD', ''),
        database: env.get('DB_DATABASE', 'postgres'),
        ssl: false, // MATIKAN SSL untuk koneksi localhost / komputer sendiri
      },
    },
  },
})

export default dbConfig