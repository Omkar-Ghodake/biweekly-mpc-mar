const express = require('express')
const {
  addPlayer,
  getPlayer,
  getAllPlayers,
  updatePlayer,
  deletePlayer,
  deletePlayers,
} = require('../controllers/PlayerController')
const router = express.Router()

router.post('/add-player', addPlayer)

router.get('/get-player', getPlayer)

router.get('/get-all-players', getAllPlayers)

router.put('/update-player', updatePlayer)

router.delete('/delete-player', deletePlayer)

router.delete('/delete-players', deletePlayers)

module.exports = router
