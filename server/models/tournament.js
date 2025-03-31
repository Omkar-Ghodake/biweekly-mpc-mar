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
  totalScore: {
    type: Number,
    default : 0
  },
  issueCount: {
    type: Number,
    default : 0

  },
  logo: {
    type: String,
    required: true,
  },
})

module.exports = model('Tournament', TournamentSchema)
