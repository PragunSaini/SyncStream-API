const bcrypt = require('bcrypt')

const { SALT_ROUNDS } = require('../config/config')

async function hashPassword(plaintext) {
  const hash = await bcrypt.hash(plaintext, SALT_ROUNDS)
  return hash
}

async function checkPassword(plaintext, hash) {
  const match = await bcrypt.compare(plaintext, hash)
  return match
}

module.exports = { hashPassword, checkPassword }
