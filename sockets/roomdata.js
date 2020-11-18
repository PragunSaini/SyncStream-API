const { rooms, users } = require('./room')

module.exports = (socket, io) => {
  /*
   * Room name change
   */
  socket.on('RENAME', data => {
    const roomid = users[socket.id]
    rooms[roomid].name = data
    io.in(roomid).emit('RENAME', data)
  })
}
