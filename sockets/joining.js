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
    // rooms[roomid].members = [...rooms[roomid].members, member]
    rooms[roomid].members[socket.id] = member
    users[socket.id] = roomid
    // Send room info to new member
    socket.emit('ROOM_INFO', { ...rooms[roomid], current: undefined })
    // Send join info to all other members
    socket.in(roomid).emit('NEW_JOIN', member)
  })

  /*
   * Leave the room (by event)
   */
  socket.on('LEAVE_ROOM', () => {
    if (users[socket.id]) {
      const roomid = users[socket.id]
      delete users[socket.id]
      delete rooms[roomid].members[socket.id]
      // rooms[roomid].members = rooms[roomid].members.filter(
      //   member => member.socketid != socket.id
      // )
      socket.leave(roomid)
      socket.in(roomid).emit('MEMBER_EXIT', socket.id)
    }
  })

  /*
   * Leave the room (by disconnect)
   */
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const roomid = users[socket.id]
      delete users[socket.id]
      delete rooms[roomid].members[socket.id]
      // rooms[roomid].members = rooms[roomid].members.filter(
      //   member => member.socketid != socket.id
      // )
      socket.leave(roomid)
      socket.in(roomid).emit('MEMBER_EXIT', socket.id)
    }
  })
}
