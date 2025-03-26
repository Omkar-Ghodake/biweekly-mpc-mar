const express = require('express')
const router = express.Router()
const { sendOTP, verifyOTP } = require('../controllers/AuthController')

// this code is for sending otp through email for resetting password
// api require email : reciever's email id , subject: which is to be sent and a html : to send html as a string

router.post('/send-otp', sendOTP)

router.post('/verify-otp', verifyOTP)

module.exports = router
