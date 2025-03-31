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
  email: {
    type: String,
    required: true,
  },
  emp_id: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
    enum: ['male', 'female'],
    required: true,
  },
  otp: String,
  isOTPVerified: {
    type: Boolean,
    default: false,
  },
})

module.exports = model('Coach', CoachSchema)
