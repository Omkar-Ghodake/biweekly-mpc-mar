const express = require("express");
const { CreateTournament } = require("../controllers/TournamentController");
const router = express.Router();

router.route("/add").get(CreateTournament);

module.exports = router;
