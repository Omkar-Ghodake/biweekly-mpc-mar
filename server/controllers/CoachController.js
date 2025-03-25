const { ErrorResponse, SuccessResponse } = require('../utils/response')
const Coach = require('../models/coach')

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

    const existingDomainName = Coach.findOne(req.body.domain_name)
    if (!existingDomainName) {
      return ErrorResponse(res, 403, 'Domain name already exists')
    }

    const existingEmpID = Coach.findOne(req.body.emp_id)
    if (!existingEmpID) {
      return ErrorResponse(res, 403, 'Domain name already exists')
    }

    const coach = await Coach.create(req.body)

    SuccessResponse(res, 201, 'Coach Created Successfully.', coach)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.getCoach = async (req, res) => {
  try {
    const { id } = req.body

    const coach = await Coach.findById(id)

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
    const coach = await Coach.find()

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
    )

    return SuccessResponse(res, 200, 'Coach updated successfully', updatedCoach)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.deleteCoach = async (req, res) => {
  try {
    const { id } = req.body

    const existingCoach = await Coach.findById(id)

    if (!existingCoach) {
      return ErrorResponse(res, 404, 'Coach not found')
    }

    const deletedCoach = await Coach.findByIdAndDelete(id)

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

    const deletedCoaches = await Coach.deleteMany({ _id: { $in: ids } })

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

exports.forgotPassword = async (req, res) => {
  try {
    const {}

  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}
