const express = require('express')
const {
  addCoach,
  getCoach,
  updateCoach,
  deleteCoach,
  getAllCoaches,
} = require('../controllers/CoachController')
const router = express.Router()

router.post('/add-coach', addCoach)

router.post('/get-coach', getCoach)

router.post('/get-all-coaches', getAllCoaches)

router.post('/update-coach', updateCoach)

router.post('/delete-coach', deleteCoach)

module.exports = router
