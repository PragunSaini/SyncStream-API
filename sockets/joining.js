const { rooms, users, deleteRoom, getNextOwner } = require('./room')

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
    let ownerLeft = false
    if (users[socket.id]) {
      const roomid = users[socket.id]
      delete users[socket.id]
      if (rooms[roomid].members[socket.id].type === 'Owner') {
        ownerLeft = true
      }
      delete rooms[roomid].members[socket.id]
      socket.leave(roomid)
      io.in(roomid).emit('MEMBER_EXIT', socket.id)

      if (Object.keys(rooms[roomid].members).length === 0) {
        // If he was last member of room, delete room
        deleteRoom(roomid)
      } else if (ownerLeft) {
        // If owner left, make a mod the owner else make guest a owner
        const newOwner = getNextOwner(roomid)
        rooms[roomid].members[newOwner].type = 'Owner'
        io.in(roomid).emit('NEW_OWNER', newOwner)
      }
    }
  })

  /*
   * Leave the room (same as LEAVE_ROOM but by disconnect)
   */
  socket.on('disconnect', () => {
    let ownerLeft = false
    if (users[socket.id]) {
      const roomid = users[socket.id]
      delete users[socket.id]
      if (rooms[roomid].members[socket.id].type === 'Owner') {
        ownerLeft = true
      }
      delete rooms[roomid].members[socket.id]
      socket.leave(roomid)
      io.in(roomid).emit('MEMBER_EXIT', socket.id)
      if (Object.keys(rooms[roomid].members).length === 0) {
        deleteRoom(roomid)
      } else if (ownerLeft) {
        const newOwner = getNextOwner(roomid)
        rooms[roomid].members[newOwner].type = 'Owner'
        io.in(roomid).emit('NEW_OWNER', newOwner)
      }
    }
  })
}
