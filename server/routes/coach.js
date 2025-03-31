const express = require('express')
const {
  addCoach,
  getCoach,
  updateCoach,
  deleteCoach,
  getAllCoaches,
  deleteCoaches,
  changePassword,
  resetPassword,
} = require('../controllers/CoachController')
const router = express.Router()
const { verifyCoach } = require('../middleware/verifyJWT')

router.post('/add-coach', verifyCoach, addCoach)

router.post('/get-coach', verifyCoach, getCoach)

router.get('/get-all-coaches', verifyCoach, getAllCoaches)

router.patch('/update-coach', verifyCoach, updateCoach)

router.delete('/delete-coach', verifyCoach, deleteCoach)

router.post('/delete-coaches', verifyCoach, deleteCoaches)

router.post('/change-password', verifyCoach, changePassword)

router.post('/reset-password', resetPassword)

module.exports = router
