const Tournament = require("../models/tournament");
const {uploadOnCloudinary} = require ("../utils/cloudinary")
exports.createTournament = async (req, res, next) => {
  try {
    const { title, description, totalScore, issueCount } = req.body;

    const logoLocalPath = req.file?.path;
    
    if (!logoLocalPath) {
      throw new Error("Logo is required");
    }
  
    const logo = await uploadOnCloudinary(logoLocalPath);
    
    if (!logo) {
      throw new Error(400, "Unable to fetch logo from cloudinary")
    }

    const tournament = await Tournament.create({
      title,
      description,
      totalScore,
      issueCount,
      logo : logo.url,
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
    let tournament = await TournamentModel.findById(req.params.id);

    if (!tournament) {
      console.log("No Tournament Data found!");
      res.status(404).json({
        success: false,
        message: "No Tournament is found!",
      });
    }

    tournament = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });

    res.status(200).json({
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

exports.deleteTournament = async (req, res, next) => {
  try {
    const deletedCount = await TournamentModel.deleteOne({
      _id: req.params.id,
    });
    if (deletedCount == 0) {
      console.log("No Tournament Found!");
      res.status(404).json({
        success: false,
        message: "No Tournament Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: `Tournament Deleted: Affected ${deletedCount} tournament`,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.getAllTournament = async (req, res, next) => {
  try {
    const tournaments = await TournamentModel.find();

    //No data found!
    if (!tournaments) {
      console.log("No Tournament Data found!");
      res.status(404).json({
        success: false,
        message: "No Tournament is found!",
      });
    }

    //If data is found
    res.status(200).json({
      success: true,
      tournaments,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.getOneTournament = async (req, res, next) => {
  try {
    const tournament = await TournamentModel.findById(req.params.id);

    //No data found!
    if (!tournament) {
      console.log("No Tournament Data found!");
      res.status(404).json({
        success: false,
        message: "No Tournament is found!",
      });
    }

    //If data is found
    res.status(200).json({
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
