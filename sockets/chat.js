module.exports = (socket, io) => {
  socket.on('chat msg', msg => {
    io.emit('new chat msg', msg)
  })
}
