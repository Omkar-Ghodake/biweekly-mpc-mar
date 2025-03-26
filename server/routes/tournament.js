const express = require("express");
const {
  createTournament,
  getOneTournament,
  getAllTournament,
  updateTournament,
  deleteTournament,
  deleteManyTournament,
} = require("../controllers/TournamentController.js");
const router = express.Router();
const upload = require("../middleware/multer.middleware.js");

router.route("/addTournament").post(upload.single("logo"), createTournament);
router.route("/getTournament/:id").get(getOneTournament);
router.route("/getAllTournament").get(getAllTournament);
router.route("/updateTournament/:id").patch(updateTournament);
router.route("/deleteTournament/:id").delete(deleteTournament);
router.route("/deleteManyTournament/").delete(deleteManyTournament);

module.exports = router;
