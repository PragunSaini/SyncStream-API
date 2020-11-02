const knex = require('../utils/db')

async function insertUser(user) {
  const insertedUser = await knex('users').insert(user).returning('*')
  return insertedUser[0]
}

async function getUser(criteria = {}) {
  if (criteria.id) {
    const user = await knex('users').where('id', criteria.id)
    return user.length == 0 ? null : user[0]
  } else if (criteria.username) {
    const user = await knex('users').where('username', criteria.username)
    return user.length == 0 ? null : user[0]
  } else {
    return null
  }
}

module.exports = { insertUser, getUser }
