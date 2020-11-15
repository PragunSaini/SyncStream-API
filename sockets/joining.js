const room = require('./room')
const { rooms } = require('./room')

module.exports = (socket, io) => {
  /*
   * Join a room
   * data = {user: {}, roomid}
   */
  socket.on('JOIN_ROOM', data => {
    const { user, roomid } = data
    // Join the room
    socket.join(roomid)
    const member = {
      ...user,
      type: user.username == room[roomid].owner ? 'Owner' : 'Guest',
    }
    rooms[roomid].members = [...rooms[roomid].members, member]
    // Send join info to all members
    io.in(roomid).emit('NEW_JOIN', member)
  })
}
