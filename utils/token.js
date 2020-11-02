const jwt = require('jsonwebtoken')

const { TOKEN_SECRET, TOKEN_EXPIRE } = require('../config/config')

const signToken = user => {
  return jwt.sign({ data: user }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRE })
}

const verifyToken = token => {
  return jwt.verify(token, TOKEN_SECRET)
}

module.exports = { signToken, verifyToken }
