const express = require('express')
const {
  addCoach,
  getCoach,
  updateCoach,
  deleteCoach,
  getAllCoaches,
  deleteCoaches,
  changePassword,
} = require('../controllers/CoachController')
const router = express.Router()
const { verifyCoach } = require('../middleware/verifyJWT')

router.post('/add-coach', verifyCoach, addCoach)

router.get('/get-coach/:id', getCoach)

router.get('/get-all-coaches', getAllCoaches)

router.post('/update-coach', verifyCoach, updateCoach)

router.delete('/delete-coach', verifyCoach, deleteCoach)

router.post('/delete-coaches', verifyCoach, deleteCoaches)

router.post('/change-password', verifyCoach, changePassword)

module.exports = router
