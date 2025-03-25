const express = require('express')
const {
  addCoach,
  getCoach,
  updateCoach,
  deleteCoach,
  getAllCoaches,
  deleteCoaches,
  forgotPassword,
} = require('../controllers/CoachController')
const router = express.Router()

router.post('/add-coach', addCoach)

router.post('/get-coach', getCoach)

router.post('/get-all-coaches', getAllCoaches)

router.post('/update-coach', updateCoach)

router.post('/delete-coach', deleteCoach)

router.post('/delete-coaches', deleteCoaches)

router.post('/forgot-password', forgotPassword)

module.exports = router
