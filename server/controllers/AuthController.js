const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Coach = require('../models/coach')
const { SECRET_KEY } = require('../config') // Ensure you have a valid SECRET_KEY
const { SuccessResponse, ErrorResponse } = require('../utils/response')
const nodemailer = require('nodemailer')

exports.authenticateUser = async (req, res) => {
  const { emp_id, password } = req.body

  try {
    // Find user by emp_id
    const coach = await Coach.findOne({ emp_id })
    if (!coach) ErrorResponse(res, 404, 'User not found')

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, coach.password)
    if (!isPasswordValid) ErrorResponse(res, 401, 'Invalid credentials')

    // Generate JWT token
    const token = jwt.sign(
      { id: coach._id, emp_id: coach.emp_id },
      SECRET_KEY,
      {
        expiresIn: '1h',
      }
    )

    SuccessResponse(res, 200, 'Authentication successful', token)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.sendOTP = async (req, res) => {
  try {
    const { username, email } = req.body

    let success = false

    const raw_otp = Math.floor(100000 + Math.random() * 900000).toString()

    const salt = await bcrypt.genSalt(10)
    const hash_otp = await bcrypt.hash(raw_otp, salt)

    Coach.findOneAndUpdate({
      domain_name: email.substring(0, email.indexOf('@')),
    })

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

    // this code is for establishing the connection between gmail and node
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
          return res.json({ success, error: err })
        } else {
          success = true
          return res.json({ success, message: 'Email Sent' })
        }
      })
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.verifyOTP = async (req, res) => {
  try {
    const { domain_name, userOtp } = req.body

    let userEnteredOtp = ''

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(userOtp, salt, function (err, hash) {
        // compare this hash to the stored encrypted otp and generate the response accordingly
      })
    })
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}
