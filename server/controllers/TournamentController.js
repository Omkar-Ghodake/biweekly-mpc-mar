const Tournament = require("../models/tournament");
const {uploadOnCloudinary} = require ("../utils/cloudinary")
const TournamentModel = require("../models/tournament");
const { SuccessResponse, ErrorResponse } = require("../utils/response");

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

    SuccessResponse(res, 201, "Tournament Created Successfully.", tournament);
  } catch (error) {
    console.log("Error: ", error);
    ErrorResponse(res, 500, "Internal Server Error!", error);
  }
};

exports.updateTournament = async (req, res, next) => {
  try {
    let tournament = await TournamentModel.findById(req.params.id);

    if (!tournament) {
      console.log("No Tournament Data found!");
      ErrorResponse(
        res,
        404,
        "No Tournament Data Found!",
        new Error("Could not find Tournament with the given id!")
      );
    }

    tournament = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    SuccessResponse(
      res,
      200,
      `Tournament with ${req.params.id} updated`,
      tournament
    );
  } catch (error) {
    console.log("Error: ", error);
    ErrorResponse(res, 500, "Internal Server Error!", error);
  }
};

exports.deleteTournament = async (req, res, next) => {
  try {
    const deletedCount = await TournamentModel.deleteOne({
      _id: req.params.id,
    });
    if (deletedCount == 0) {
      console.log("No Tournament Found!");
      ErrorResponse(
        res,
        404,
        "No Tournament Data Found!",
        new Error("Could not find Tournament with the given id!")
      );
    }

    res.status(200).json({
      success: true,
      message: `Tournament Deleted: Affected ${deletedCount} tournament`,
    });
    SuccessResponse(
      res,
      201,
      `Tournament Deleted: Affected ${deletedCount} tournament.`,
      deletedCount
    );
  } catch (error) {
    console.log("Error: ", error);
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

exports.getAllTournament = async (req, res, next) => {
  try {
    const tournaments = await TournamentModel.find();

    //No data found!
    if (!tournaments) {
      console.log("No Tournament Data found!");
      ErrorResponse(
        res,
        404,
        "No Tournament Data Found!",
        new Error("No Data in Tournament Collection")
      );
    }

    //If data is found
    SuccessResponse(
      res,
      201,
      `Successfully Fetched ${tournaments.length} Tournaments.`,
      tournaments
    );
  } catch (error) {
    console.log("Error: ", error);
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

exports.getOneTournament = async (req, res, next) => {
  try {
    const tournament = await TournamentModel.findById(req.params.id);

    //No data found!
    if (!tournament) {
      console.log("No Tournament Data found!");
      ErrorResponse(
        res,
        404,
        "No Tournament Data Found!",
        new Error("Could not find Tournament with the given id!")
      );
    }

    //If data is found
    SuccessResponse(
      res,
      201,
      `Successfully Fetched Tournament with Tournament Id: ${req.params.id}`,
      tournament
    );
  } catch (error) {
    console.log("Error: ", error);
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
