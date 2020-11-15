const { nanoid } = require('nanoid')

const rooms = {}

const createRoom = ownerUserName => {
  const roomid = nanoid(8)
  rooms[roomid] = {
    members: [],
    playlist: [],
    name: 'Room ' + roomid,
    owner: ownerUserName,
  }
  return roomid
}

const checkRoomExists = roomid => {
  return Object.prototype.hasOwnProperty.call(rooms, roomid)
}

const deleteRoom = roomid => {
  delete rooms[roomid]
}

module.exports = { rooms, createRoom, checkRoomExists, deleteRoom }
