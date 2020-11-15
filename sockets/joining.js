const room = require('./room')
const { rooms, users } = require('./room')

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
      type: user.username == rooms[roomid].owner ? 'Owner' : 'Guest',
      socketid: socket.id,
    }
    rooms[roomid].members = [...rooms[roomid].members, member]
    users[socket.id] = roomid
    // Send room info to new member
    socket.emit('ROOM_INFO', rooms[roomid])
    // Send join info to all other members
    socket.in(roomid).emit('NEW_JOIN', member)
  })

  socket.on('LEAVE_ROOM', () => {
    if (users[socket.id]) {
      const roomid = users[socket.id]
      delete users[socket.id]
      rooms[roomid].members = rooms[roomid].members.filter(
        member => member.socketid != socket.id
      )
      socket.in(roomid).emit('MEMBER_EXIT', socket.id)
    }
  })

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const roomid = users[socket.id]
      delete users[socket.id]
      rooms[roomid].members = rooms[roomid].members.filter(
        member => member.socketid != socket.id
      )
      socket.in(roomid).emit('MEMBER_EXIT', socket.id)
    }
  })
}
