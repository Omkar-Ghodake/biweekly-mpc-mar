const mongoose = require('mongoose')
const { Schema, model } = mongoose

const TeamSchema = new Schema({
  _id: {
    type: String,
    default: 'mpc_team',
  },
  short_name: {
    type: String,
    required: true,
  },
  long_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag_line: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: '',
  },
  display_picture: {
    type: String,
    default: '',
  },
})

module.exports = model('Team', TeamSchema)
