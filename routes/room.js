const router = require('express').Router()

const { getUser } = require('../models/user')
const { authenticateToken } = require('../utils/middleware')
const { createRoom, checkRoomExists } = require('../sockets/room')

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const user = await getUser({ id: req.user.id })
    const roomid = createRoom(user.username)
    res.json({ roomid })
  } catch (e) {
    next(e)
  }
})

router.post('/join', authenticateToken, (req, res) => {
  const { roomid } = req.body
  if (!checkRoomExists(roomid)) {
    res.status(404).json({ msg: 'Room ' + roomid + ' does not exist' })
  }
  res.json({ roomid })
})

module.exports = router
