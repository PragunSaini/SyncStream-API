const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')

const io = require('socket.io')(http, {
  // Also requires CORS
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

const { PORT } = require('./config/config')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')

const chatSocket = require('./sockets/chat')

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

  chatSocket(socket, io)
})

// Start the server
http.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}...`)
})
