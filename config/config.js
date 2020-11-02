require('dotenv').config()

module.exports.PORT = process.env.PORT || 8000

// Database Connection
module.exports.PG_HOST = process.env.PG_HOST
module.exports.PG_DATABASE = process.env.PG_DATABASE
module.exports.PG_USER = process.env.PG_USER
module.exports.PG_PASSWORD = process.env.PG_PASSWORD

// Password and token crypto
module.exports.SALT_ROUNDS = 10
module.exports.TOKEN_SECRET = process.env.TOKEN_SECRET
module.exports.TOKEN_EXPIRE = '24h'
