const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend access
    credentials: true, // Allow cookies & session authentication
  })
);

// ✅ Manually set CORS headers in responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight requests
  }

  next();
});
app.use(express.json({ limit: "10mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase form-data payload limit
connectToMongo()


app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/coach', require('./routes/coach'))
app.use('/api/v1/players', require('./routes/player'))
app.use('/api/v1/tournaments', require('./routes/tournament'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
