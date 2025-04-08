const mongoose = require('mongoose')
const { Schema, model } = mongoose

const TournamentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numeric_data: [
    { key: String, value: Number },
    { key: String, value: Number },
  ],
  logo: {
    type: String,
    required: true,
  },
})

module.exports = model('Tournament', TournamentSchema)
