const { rooms, users } = require('./room')

module.exports = (socket, io) => {
  /*
   * Promote a member
   * Possible: Guest -> Mod
   */
  socket.on('PROMOTE', data => {
    const roomid = users[socket.id]
    // console.log(rooms[roomid].members[data])
    if (
      rooms[roomid].members[data].type === 'Owner' ||
      rooms[roomid].members[data].type === 'Mod'
    ) {
      // Can't promote Mod or Owner
      return
    } else {
      // Promote Guest to Mod
      rooms[roomid].members[data].type = 'Mod'
      io.in(roomid).emit('PROMOTE', data)
    }
  })

  /*
   * Demote a member
   * Possible: Mod -> Guest
   */
  socket.on('DEMOTE', data => {
    const roomid = users[socket.id]
    if (
      rooms[roomid].members[data].type === 'Owner' ||
      rooms[roomid].members[data].type === 'Guest'
    ) {
      // Can't demote Guest or Owner
      return
    } else {
      // Demote Mod to Guest
      rooms[roomid].members[data].type = 'Guest'
      io.in(roomid).emit('DEMOTE', data)
    }
  })

  socket.on('KICK', data => {
    const roomid = users[socket.id]
    if (rooms[roomid].members[data].type === 'Owner') {
      return
    }
    delete users[data]
    delete rooms[roomid].members[data]
    io.to(data).emit('KICK')
    io.in(roomid).emit('MEMBER_EXIT', data)
  })
}
