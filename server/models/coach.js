const mongoose = require('mongoose')
const { Schema, model } = mongoose

const CoachSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  domain_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  emp_id: {
    type: mongoose.Types.Long,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
})

module.exports = model('Coach', CoachSchema)
