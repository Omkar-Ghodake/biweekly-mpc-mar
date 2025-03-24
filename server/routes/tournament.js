const express = require("express");
const { createTournament, getOneTournament, getAllTournament, updateTournament, deleteTournament } = require("../controllers/TournamentController");
const router = express.Router();

router.route("/addTournament").post(createTournament);
router.route("/getTournament/:id").get(getOneTournament);
router.route("/getAllTournament").get(getAllTournament);
router.route("/updateTournament/").patch(updateTournament);
router.route("/deleteTournament/:id").delete(deleteTournament)

module.exports = router;
