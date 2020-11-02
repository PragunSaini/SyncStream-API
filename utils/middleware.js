const { verifyToken } = require('./token')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]
  if (token == null) res.status(403).json({ msg: 'Authentication required' })

  try {
    const payload = verifyToken(token)
    req.user = payload.data
    next()
  } catch (e) {
    res.status(403).json({ msg: 'Invalid token' })
  }
}

module.exports = { authenticateToken }
