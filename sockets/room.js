const { nanoid } = require('nanoid')

const rooms = {}
const users = {}

const createRoom = ownerUserName => {
  const roomid = nanoid(8)
  rooms[roomid] = {
    members: {},
    playlist: [],
    name: 'Room ' + roomid,
    owner: ownerUserName,
    current: null,
  }
  return roomid
}

const checkRoomExists = roomid => {
  return Object.prototype.hasOwnProperty.call(rooms, roomid)
}

const getNextOwner = roomid => {
  let firstAvailable = null
  for (let sockid in rooms[roomid].members) {
    if (rooms[roomid].members[sockid].type === 'Mod') {
      return sockid
    } else {
      if (firstAvailable == null) {
        firstAvailable = sockid
      }
    }
  }
  return firstAvailable
}

const deleteRoom = roomid => {
  if (rooms[roomid].current !== null) {
    clearInterval(rooms[roomid].current.timer)
  }
  delete rooms[roomid]
}

module.exports = {
  rooms,
  users,
  createRoom,
  checkRoomExists,
  deleteRoom,
  getNextOwner,
}
