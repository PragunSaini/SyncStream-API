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

const deleteRoom = roomid => {
  delete rooms[roomid]
}

module.exports = { rooms, users, createRoom, checkRoomExists, deleteRoom }
