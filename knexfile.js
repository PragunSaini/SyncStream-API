// Update with your config settings.
const config = require('./config/config')

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: config.PG_DATABASE,
      user: config.PG_USER,
      password: config.PG_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: config.PG_DATABASE,
      user: config.PG_USER,
      password: config.PG_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
