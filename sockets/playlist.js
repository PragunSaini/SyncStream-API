const { nanoid } = require('nanoid')

const { rooms, users } = require('./room')

module.exports = (socket, io) => {
  /*
   * Save playlist item
   */
  socket.on('PLAY_ADD', data => {
    const roomid = users[socket.id]
    const newItem = { ...data, id: nanoid(3) + data.vid }
    rooms[roomid].playlist = [...rooms[roomid].playlist, newItem]
    // Broadcast to all members
    io.in(roomid).emit('PLAY_ADD', newItem)
  })

  /*
   * Delete playlist item
   */
  socket.on('PLAY_DELETE', data => {
    const roomid = users[socket.id]
    rooms[roomid].playlist = rooms[roomid].playlist.filter(
      play => play.id != data
    )
    // Also broadcast to clients
    io.in(roomid).emit('PLAY_DELETE', data)
  })

  /*
   * Move item up in list
   */
  socket.on('PLAY_UP', data => {
    const roomid = users[socket.id]
    const playlist = rooms[roomid].playlist
    const ind = playlist.findIndex(item => item.id == data)
    if (ind == 0) return
    ;[playlist[ind], playlist[ind - 1]] = [playlist[ind - 1], playlist[ind]]
    io.in(roomid).emit('PLAY_UP', data)
  })

  /*
   * Move item down in list
   */
  socket.on('PLAY_DOWN', data => {
    const roomid = users[socket.id]
    const playlist = rooms[roomid].playlist
    const ind = playlist.findIndex(item => item.id == data)
    if (ind == playlist.length - 1) return
    ;[playlist[ind], playlist[ind + 1]] = [playlist[ind + 1], playlist[ind]]
    io.in(roomid).emit('PLAY_DOWN', data)
  })
}
