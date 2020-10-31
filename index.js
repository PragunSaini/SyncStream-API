const express = require('express')

const { PORT } = require('./config/config')

const app = express()

app.get('/', (req, res) => {
  res.json({
    name: 'SyncStream API v1',
    msg: 'Hello, World',
  })
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}...`)
})
