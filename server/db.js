const mongoose = require('mongoose')
require('dotenv').config()

const mongoUri = process.env.MONG_URI
let connectionStatus = 0

const connectToMongo = async () => {
  try {
    if (connectionStatus) return console.log('Using existing connection...')

    const con = await mongoose.connect("mongodb+srv://omkar-ghodake:Omkar1831@cluster0.w5b4a.mongodb.net/MPC_Biweekly_Jan2025")

    connectionStatus = con.connections[0].readyState

    if (connectionStatus) return console.log('Connected to Mongo.')
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Failed to connect to Mongo.' }
  }
}

module.exports = connectToMongo