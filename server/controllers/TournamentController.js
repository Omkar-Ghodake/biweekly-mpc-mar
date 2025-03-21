const Tournament = require("../models/tournament");

exports.createTournament = async (req, res, next) => {
  try {
    const { title, description, totalScore, issueCount, logo } = req.body;

    const tournament = await Tournament.create({
      title,
      description,
      totalScore,
      issueCount,
      logo,
    });

    res.status(201).json({
      success: true,
      tournament,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.updateTournament = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.deleteTournament = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
