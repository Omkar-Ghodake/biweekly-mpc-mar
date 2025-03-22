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
    required: true,
  },
  issueCount: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
})

module.exports = model('Tournament', TournamentSchema)
