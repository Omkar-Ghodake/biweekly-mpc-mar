import { Schema, model } from 'mongoose'

const tournamentSchema = new Schema({
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

export const Tournament = model('Tournament', tournamentSchema)
