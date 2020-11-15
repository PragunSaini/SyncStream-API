const { users } = require('./room')

module.exports = (socket, io) => {
  // When a chat is sent
  socket.on('CHAT_MESSAGE', data => {
    const roomid = users[socket.id]
    // Boadcast back to all room members
    io.in(roomid).emit('CHAT_MESSAGE', data)
  })
}
