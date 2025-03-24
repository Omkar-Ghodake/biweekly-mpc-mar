const mongoose = require('mongoose')
const { Schema, model } = mongoose

const EmployeeSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
  },
})

module.exports = model('Employee', EmployeeSchema)
