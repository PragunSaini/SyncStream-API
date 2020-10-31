const config = require('../config/config')

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: config.PG_HOST,
    user: config.PG_USER,
    password: config.PG_PASSWORD,
    database: config.PG_DATABASE,
  },
})

module.exports = knex
