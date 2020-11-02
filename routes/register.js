const router = require('express').Router()

const { insertUser, getUser } = require('../models/user')
const { hashPassword } = require('../utils/password')

router.post('/', async (req, res, next) => {
  try {
    const user = req.body
    if (!user.username || !user.password || !user.name) {
      res.status(400).json({ msg: 'All fields were not present' })
    } else if (user.password.length < 8) {
      res.status(400).json({ msg: 'Password length must be greater than 8' })
    } else if ((await getUser({ username: user.username })) != null) {
      res.status(400).json({ msg: 'Username already exists' })
    } else {
      user.password = await hashPassword(user.password)
      const insertedUser = await insertUser(user)
      res.json({ ...insertedUser, password: undefined })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
