const express = require('express')
const router = express.Router()
const {
  sendOTP,
  verifyOTP,
  authenticateUser,
} = require('../controllers/AuthController')

router.post('/coach-login', authenticateUser)

router.post('/send-otp', sendOTP)

router.post('/verify-otp', verifyOTP)

module.exports = router
