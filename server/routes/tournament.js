const express = require('express')
const {
  createTournament,
  getOneTournament,
  getAllTournament,
  updateTournament,
  deleteTournament,
  deleteManyTournament,
} = require('../controllers/TournamentController.js')
const router = express.Router()
const upload = require('../middleware/multer.middleware.js')

router.route('/add-tournament').post(upload.single('logo'), createTournament)
router.route('/get-tournament/:id').get(getOneTournament)
router.route('/get-all-tournaments').get(getAllTournament)
router.route('/update-tournament/:id').patch(updateTournament)
router.route('/delete-tournament/:id').delete(deleteTournament)
router.route('/delete-many-tournaments').delete(deleteManyTournament)

module.exports = router
