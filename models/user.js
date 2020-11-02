const knex = require('../utils/db')

async function insertUser(user) {
  const insertedUser = await knex('users').insert(user).returning('*')
  return insertedUser[0]
}

module.exports = { insertUser }
