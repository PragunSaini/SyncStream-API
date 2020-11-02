const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const bodyParser = require('body-parser')

const { PORT } = require('./config/config')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')

// Add middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Add routes
app.get('/', (req, res) => {
  res.json({
    name: 'SyncStream API v1',
    msg: 'Hello, World',
  })
})

app.use('/register', registerRoute)
app.use('/login', loginRoute)

// Setup sockets
io.on('connection', socket => {
  console.log('A user connected!')
  socket.on('disconnect', () => {
    console.log('User Disconnected!')
  })
})

// Start the server
http.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}...`)
})
