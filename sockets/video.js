const { rooms, users } = require('./room')

module.exports = (socket, io) => {
  /*
   * Start playing a video
   */
  socket.on('START', () => {
    const roomid = users[socket.id]
    if (
      rooms[roomid].current != null &&
      rooms[roomid].current?.state !== 'PLAYING'
    ) {
      rooms[roomid].current = {
        ...rooms[roomid].current,
        state: 'PLAYING',
        time: 0,
        timer: setInterval(() => {
          rooms[roomid].current.time++
          io.in(roomid).emit('SYNC', rooms[roomid].current.time)
        }, 1000),
      }
    }
  })

  /*
   * Send current video playing info to new member on request
   */
  socket.on('CURRENT', () => {
    const roomid = users[socket.id]
    // send current track info to new member
    if (rooms[roomid].current !== null) {
      socket.emit('CURRENT', {
        vid: rooms[roomid].current.vid,
        state: rooms[roomid].current.state,
        time: rooms[roomid].current.time,
      })
    }
  })

  /*
   * Pause current video
   */
  socket.on('PAUSE', data => {
    const roomid = users[socket.id]
    if (rooms[roomid]?.current?.state !== 'PAUSED') {
      clearInterval(rooms[roomid].current.timer)
      rooms[roomid].current = {
        ...rooms[roomid].current,
        time: data,
        state: 'PAUSED',
      }
      socket.in(roomid).emit('PAUSE', data)
    } else if (rooms[roomid]?.current?.state === 'PAUSED') {
      rooms[roomid].current.time = data
    }
  })

  /*
   * Resume video play
   */
  socket.on('PLAY', () => {
    const roomid = users[socket.id]
    if (rooms[roomid]?.current?.state === 'PAUSED') {
      socket.in(roomid).emit('PLAY')
      rooms[roomid].current = {
        ...rooms[roomid].current,
        state: 'PLAYING',
        timer: setInterval(() => {
          rooms[roomid].current.time++
          io.in(roomid).emit('SYNC', rooms[roomid].current.time)
        }, 1000),
      }
    }
  })

  // TODO: NEW USER JOIN sync, check conditions checking and null errors

  /*
   * Video ended, start next video if queued
   */
  socket.on('END', data => {
    const roomid = users[socket.id]
    if (rooms[roomid]?.current?.vid === data) {
      // maybe playlist id instead of vid above ??
      clearInterval(rooms[roomid].current.timer)
      if (rooms[roomid].playlist.length > 0) {
        const playitem = rooms[roomid].playlist.shift()
        io.in(roomid).emit('PLAY_DELETE', playitem.id)
        rooms[roomid].current = {
          vid: playitem.vid,
          status: 'LOADED',
        }
        io.in(roomid).emit('LOAD', playitem.vid)
      } else {
        rooms[roomid].current = null
      }
    }
  })
}
