const { ErrorResponse, SuccessResponse } = require('../utils/response')
const Coach = require('../models/coach')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

exports.addCoach = async (req, res) => {
  try {
    // const {
    //   domain_name,
    //   emp_id,
    //   pre_score,
    //   severity_count,
    //   total_score,
    //   courses,
    //   image,
    //   gender,
    //   role,
    // } = req.body

    req.body.domain_name = req.body.domain_name.toLowerCase()

    const existingDomainName = await Coach.findOne({
      domain_name: req.body.domain_name,
    })
    if (existingDomainName) {
      return ErrorResponse(res, 403, 'Domain name already exists')
    }

    const existingEmpID = await Coach.findOne({
      emp_id: req.body.emp_id,
    })
    if (existingEmpID) {
      return ErrorResponse(res, 403, 'Employee ID already exists')
    }

    const generatedPass = 'Temp@1831$'

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(generatedPass, salt)

    const coach = await Coach.create({ ...req.body, password: hashedPass }).select("-password");

    SuccessResponse(res, 201, 'Coach Created Successfully.', coach)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.getCoach = async (req, res) => {
  try {
    const { id } = req.coach

    if (!id) return ErrorResponse(res, 404, 'Coach not found')

    const coach = await Coach.findById(id).select("-password");

    if (!coach) {
      return ErrorResponse(res, 404, 'Coach not found')
    }

    return SuccessResponse(res, 200, '', coach)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.getAllCoaches = async (req, res) => {
  try {
    const coach = await Coach.find().select("-password");

    if (!coach) {
      return ErrorResponse(res, 404, 'Coach not found')
    }

    return SuccessResponse(res, 200, '', coach)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.updateCoach = async (req, res) => {
  try {
    const { id } = req.body

    const existingCoach = await Coach.findById(id)

    if (!existingCoach) {
      return ErrorResponse(res, 404, 'Coach not found')
    }

    const updatedCoach = await Coach.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    return SuccessResponse(res, 200, 'Coach updated successfully', updatedCoach)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.deleteCoach = async (req, res) => {
  try {
    if (!req.body.id) return ErrorResponse(res, 404, 'ID is required')
    const id = new mongoose.Types.ObjectId(req.body.id)

    const existingCoach = await Coach.findById(id)

    if (!existingCoach) {
      return ErrorResponse(res, 404, 'Coach not found')
    }

    const deletedCoach = await Coach.findByIdAndDelete(id).select("-password");

    return SuccessResponse(res, 200, 'Coach deleted successfully', deletedCoach)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.deleteCoaches = async (req, res) => {
  try {
    const { ids } = req.body

    const existingCoaches = await Coach.find({ _id: { $in: ids } })

    if (existingCoaches === 0) {
      return ErrorResponse(res, 404, 'No coaches found')
    }

    const deletedCoaches = await Coach.deleteMany({ _id: { $in: ids } }).select("-password");

    return SuccessResponse(
      res,
      200,
      `${existingCoaches.length} coaches deleted successfully`,
      deletedCoaches
    )
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const { id } = req.coach

    const existingCoach = await Coach.findById(id)
    if (!existingCoach) return ErrorResponse(res, 404, 'Coach not found')

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      existingCoach.password
    )
    if (!isCurrentPasswordValid)
      return ErrorResponse(res, 401, 'Invalid credentials')

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(newPassword, salt)

    existingCoach.password = hashedPass
    await existingCoach.save()
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}
