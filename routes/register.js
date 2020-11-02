const router = require('express').Router()

const { insertUser } = require('../models/user')
const { hashPassword } = require('../utils/password')

router.post('/', async (req, res, next) => {
  try {
    const user = req.body
    user.password = await hashPassword(user.password)
    const insertedUser = await insertUser(user)
    res.json(insertedUser)
  } catch (e) {
    next(e)
  }
})

module.exports = router
