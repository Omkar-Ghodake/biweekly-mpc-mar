const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Coach = require('../models/coach')
// const { SECRET_KEY } = require('../config')
const { SuccessResponse, ErrorResponse } = require('../utils/response')
const nodemailer = require('nodemailer')

const SECRET_KEY = 'ramtaJogi'

exports.authenticateUser = async (req, res) => {
  req.body.domain_name = req.body.domain_name?.toLowerCase()
  const { domain_name, password } = req.body

  try {
    if (!domain_name) return ErrorResponse(res, 401, 'Domain name required')
    if (!password) return ErrorResponse(res, 401, 'Username required')

    const coach = await Coach.findOne({
      domain_name,
    })
    if (!coach) return ErrorResponse(res, 404, 'User not found')

    const isPasswordValid = await bcrypt.compare(password, coach.password)
    if (!isPasswordValid) return ErrorResponse(res, 401, 'Invalid credentials')

    const token = jwt.sign(
      { id: coach._id, domain_name: coach.domain_name },
      SECRET_KEY,
      {
        expiresIn: '1h',
      }
    )

    SuccessResponse(res, 200, 'Authentication successful', { token, coach })
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.sendOTP = async (req, res) => {
  try {
    const { username, email } = req.body

    if (!username) return ErrorResponse(res, 401, 'Username required')
    if (!email) return ErrorResponse(res, 401, 'Email required')

    const raw_otp = Math.floor(100000 + Math.random() * 900000).toString()

    const salt = await bcrypt.genSalt(10)
    const hashed_otp = await bcrypt.hash(raw_otp, salt)

    const updatedCoach = await Coach.findOneAndUpdate(
      {
        domain_name: email.substring(0, email.indexOf('@')),
        // domain_name: 'Omkar.Ghodake',
      },
      { otp: hashed_otp },
      { new: true }
    )

    const msg = {
      from: 'testbot.1831@gmail.com',
      to: req.body.email,
      subject: 'Reset Password',
      html: `
            <div>
            <h3>Hello ${username},<br>Your otp to reset password is :</h3>
    
            <div style="display: flex; justify-content: center;">
                <h1 fontSize:2vw; style="background-color:white; display: inline; color:rgb(0, 132, 209);">${raw_otp}</h1>
            </div>
    
            <h3>Thanks and Regards,<br>Team MPC</h3>
            </div>
        `,
    }

    nodemailer
      .createTransport({
        service: 'gmail',
        auth: {
          // add the sender credentials
          user: 'testbot.1831@gmail.com',
          pass: 'trlxmuclinxflaku',
        },
        port: 465,
        host: 'smtp.gmail.com',
      })
      .sendMail(msg, (err) => {
        if (err) {
          return ErrorResponse(res, 500, 'Email not sent', err)
        } else {
          return SuccessResponse(res, 200, 'Email sent', updatedCoach)
        }
      })
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.verifyOTP = async (req, res) => {
  try {
    const { domain_name, user_otp } = req.body

    if (!user_otp) return ErrorResponse(res, 404, 'OTP required')

    const existingCoach = await Coach.findOne({ domain_name })
    if (!existingCoach) return ErrorResponse(res, 404, 'User not found')

    const created_otp = existingCoach.otp

    const isOTPValid = await bcrypt.compare(user_otp, created_otp)

    if (!isOTPValid) return ErrorResponse(res, 404, 'Invalid OTP')

    const updatedCoach = await Coach.findOneAndUpdate(
      {
        domain_name,
      },
      { otp: '' },
      { new: true }
    )

    SuccessResponse(res, 200, 'OTP is valid', updatedCoach)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}
