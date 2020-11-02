const router = require('express').Router()

const { getUser } = require('../models/user')
const { checkPassword } = require('../utils/password')
const { signToken } = require('../utils/token')
const { authenticateToken } = require('../utils/middleware')

router.post('/', async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password

    const user = await getUser({ username })
    if (user == null) throw Error()

    if (!(await checkPassword(password, user.password))) {
      throw Error()
    }

    const token = signToken({ id: user.id, username: user.username })
    res.json({ token, ...user, password: undefined })
  } catch (e) {
    res.status(401).json({ msg: 'Invalid username or password' })
  }
})

router.get('/refresh', authenticateToken, async (req, res, next) => {
  try {
    const user = await getUser({ id: req.user.id })
    const token = signToken({ id: user.id, username: user.username })
    res.json({ token, ...user, password: undefined })
  } catch (e) {
    next(e)
  }
})

module.exports = router
