const { rooms, users } = require('./room')

module.exports = (socket, io) => {
  /*
   * Promote a member
   * Possible: Guest -> Mod
   */
  socket.on('PROMOTE', data => {
    const roomid = users[socket.id]
    // Promote Guest to Mod
    if (rooms[roomid].members[data].type === 'Guest') {
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
    // Demote Mod to Guest
    if (rooms[roomid].members[data].type === 'Mod') {
      rooms[roomid].members[data].type = 'Guest'
      io.in(roomid).emit('DEMOTE', data)
    }
  })

  /*
   * Recieved a kick request for a user
   */
  socket.on('KICK', data => {
    const roomid = users[socket.id]
    if (rooms[roomid].members[data].type === 'Owner') {
      return
    }
    // Send kick to that user
    io.to(data).emit('KICK')
  })
}
