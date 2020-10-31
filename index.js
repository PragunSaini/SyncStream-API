const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const { PORT } = require('./config/config')

app.get('/', (req, res) => {
  res.json({
    name: 'SyncStream API v1',
    msg: 'Hello, World',
  })
})

io.on('connection', socket => {
  console.log('A user connected!')
  socket.on('disconnect', () => {
    console.log('User Disconnected!')
  })
})

http.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}...`)
})
