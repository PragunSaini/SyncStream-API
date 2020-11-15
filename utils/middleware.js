const { verifyToken } = require('./token')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]
  if (token == null) {
    res.status(401).json({ msg: 'Authentication required' })
    return
  }

  try {
    const payload = verifyToken(token)
    req.user = payload.data
    next()
  } catch (e) {
    res.status(401).json({ msg: 'Invalid token' })
  }
}

module.exports = { authenticateToken }
