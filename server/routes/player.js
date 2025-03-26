const express = require('express')
const {
  addPlayer,
  getPlayer,
  getAllPlayers,
  updatePlayer,
  deletePlayer,
  deletePlayers,
} = require('../controllers/PlayerController.js')
const router = express.Router()
const upload = require("../middleware/multer.middleware.js")

router.post('/add-player',upload.single("image"), addPlayer)

router.get('/get-player/:id', getPlayer)

router.get('/get-all-players', getAllPlayers)

router.put('/update-player/:id',upload.single("image")  , updatePlayer)

router.delete('/delete-player/:id', deletePlayer)

router.delete('/delete-players', deletePlayers)

module.exports = router
