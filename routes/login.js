const router = require('express').Router()

const { getUser } = require('../models/user')
const { checkPassword } = require('../utils/password')
const { signToken } = require('../utils/token')

router.post('/', async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password

    const user = await getUser({ username })
    if (user == null) throw Error()

    if (!(await checkPassword(password, user.password))) {
      throw Error()
    }

    const token = signToken({ username: user.username })
    res.json({ token, ...user, password: undefined })
  } catch (e) {
    res.status(401).json({ msg: 'Invalid username or password' })
  }
})

module.exports = router
