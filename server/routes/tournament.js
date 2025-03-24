const express = require("express");
const { createTournament, getOneTournament, getAllTournament, updateTournament, deleteTournament } = require("../controllers/TournamentController.js");
const router = express.Router();
const upload = require("../middleware/multer.middleware.js")

router.route("/addTournament").post(upload.single("logo"),createTournament); 
router.route("/getTournament/:id").get(getOneTournament);
router.route("/getAllTournament").get(getAllTournament);
router.route("/updateTournament/").patch(updateTournament);
router.route("/deleteTournament/:id").delete(deleteTournament)

module.exports = router;





