const Team = require("../models/team");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const { ErrorResponse, SuccessResponse } = require('../utils/response')

// Get Team Details
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById("mpc_team");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    return SuccessResponse(res, 200, "Team fetched successfully", team);
  } catch (error) {
    console.error("Error fetching team:", error);
    return ErrorResponse(res, 500, "Internal Server Error!", error);
  }
};

// Update Team Details
exports.updateTeam = async (req, res) => {
    try {
      const id  = "mpc_team";
  
      // Check if team exists
      const existingTeam = await Team.findById(id);
      if (!existingTeam) {
        return ErrorResponse(res, 404, "Team not found");
      }
  
      let updatedFields = { ...req.body };
  
      // Handle file uploads for logo and display_picture
      if (req.files) {
        if (req.files["logo"]) {
          const logoUpload = await uploadOnCloudinary(req.files["logo"][0].path);
          if (!logoUpload) {
            return ErrorResponse(res, 500, "Internal Cloudinary Error");
          }
          updatedFields.logo = logoUpload.url;
        }
        if (req.files["display_picture"]) {
          const displayPictureUpload = await uploadOnCloudinary(req.files["display_picture"][0].path);
          if (!displayPictureUpload) {
            return ErrorResponse(res, 500, "Internal Cloudinary Error");
          }
          updatedFields.display_picture = displayPictureUpload.url;
        }
      }
  
      // Update team details
      const updatedTeam = await Team.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });
  
      return SuccessResponse(res, 200, "Team updated successfully", updatedTeam);
    } catch (error) {
      console.error("Error updating team:", error);
      return ErrorResponse(res, 500, "Internal Server Error!", error);
    }
  };

  exports.addTeam = async (req, res) => {
    try {
      let teamData = { ...req.body };
  
      // Handle file uploads for logo and display_picture
      if (req.files) {
        if (req.files["logo"]) {
          const logoUpload = await uploadOnCloudinary(req.files["logo"][0].path);
          if (!logoUpload) return ErrorResponse(res, 500, "Internal Cloudinary Error");
          teamData.logo = logoUpload.url;
        }
        if (req.files["display_picture"]) {
          const displayPictureUpload = await uploadOnCloudinary(req.files["display_picture"][0].path);
          if (!displayPictureUpload) return ErrorResponse(res, 500, "Internal Cloudinary Error");
          teamData.display_picture = displayPictureUpload.url;
        }
      }
  
      // Create new team
      const newTeam = await Team.create(teamData);
  
      return SuccessResponse(res, 201, "Team added successfully", newTeam);
    } catch (error) {
      console.error("Error adding team:", error);
      return ErrorResponse(res, 500, "Internal Server Error!", error);
    }
  };
  
