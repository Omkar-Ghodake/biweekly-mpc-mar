const mongoose = require('mongoose')
const { Schema, model } = mongoose

const PlayerSchema = new Schema({
  domain_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  emp_id: {
    type: Number,
    required: true,
    unique: true,
  },
  pre_score: {
    type: Number,
    default: 0,
  },
  severity_count: {
    blocker: { type: Number, default: 0 },
    critical: { type: Number, default: 0 },
    major: { type: Number, default: 0 },
    normal: { type: Number, default: 0 },
    minor: { type: Number, default: 0 },
  },
  total_score: {
    type: Number,
    default: 0,
  },
  total_issues: {
    type: Number,
    default: 0,
  },
  courses: {
    type: [String],
    default: [],
  },
  projects: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['player', 'captain'],
    default: 'player',
  },
})

module.exports = model('Player', PlayerSchema)
