const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

connectToMongo()

app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/players', require('./routes/player'))
app.use('/api/v1/tournaments', require('./routes/tournament'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
