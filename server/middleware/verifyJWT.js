const jwt = require('jsonwebtoken')
const { ErrorResponse } = require('../utils/response')
require('dotenv').config()

const JWT_SECRET = 'ramtaJogi'

exports.verifyCoach = (req, res, next) => {
  const { authToken } = req.body

  if (!authToken) {
    return ErrorResponse(res, 401, 'Unauthorized access')
  }

  try {
    const data = jwt.verify(authToken, JWT_SECRET)

    req.coach = data

    next()
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}
