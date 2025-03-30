const { ErrorResponse, SuccessResponse } = require('../utils/response.js')
const Player = require('../models/player.js')
const { uploadOnCloudinary } = require('../utils/cloudinary.js')

exports.addPlayer = async (req, res) => {
  try {
    const {
      domain_name,
      name,
      emp_id,
      pre_score,
      severity_count = {},  // Default to an empty object to prevent errors
      total_score,
      total_issues,
      courses,
      gender,
      role,

    } = req.body;

    // Check if domain_name already exists
    const existingDomainName = await Player.findOne({ domain_name });
    if (existingDomainName) {
      return ErrorResponse(res, 403, 'Domain name already exists');
    }

    // Check if emp_id already exists
    const existingEmpID = await Player.findOne({ emp_id });
    if (existingEmpID) {
      return ErrorResponse(res, 403, 'Employee ID already exists');
    }

    // Check if image is uploaded
    const playerImagePath = req.file?.path;
    console.log(playerImagePath);

    if (!playerImagePath) {
      return ErrorResponse(res, 404, "Player's Image is required");
    }

    // Upload image to Cloudinary
    const playerImage = await uploadOnCloudinary(playerImagePath);
    if (!playerImage) {
      return ErrorResponse(res, 500, "Internal Cloudinary Error");
    }
    
    const coursesArray = req.body.courses.split(","); 
    console.log(courses);

    // Create player in DB
    const player = await Player.create({
      domain_name,
      name,
      emp_id,
      pre_score,
      severity_count,
      total_issues,  // ✅ Add total issues
      total_score,
      courses : coursesArray,
      gender,
      role,
      image: playerImage.url
    });

    SuccessResponse(res, 201, 'Player Created Successfully.', player);
  } catch (error) {
    console.error("Error:", error);
    ErrorResponse(res, 500, 'Internal Server Error!', error);
  }
};

exports.getPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await Player.findById(id)

    if (!player) {
      return ErrorResponse(res, 404, 'Player not found')
    }

    return SuccessResponse(res, 200, '', player)
  } catch (error) {
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();

    if (!players || players.length === 0) {
      return ErrorResponse(res, 404, 'Players not found');
    }


    return SuccessResponse(res, 200, 'Players retrieved successfully', players);
  } catch (error) {
    console.error("Error:", error);
    ErrorResponse(res, 500, 'Internal Server Error!', error);
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if player exists
    const existingPlayer = await Player.findById(id);
    if (!existingPlayer) {
      return ErrorResponse(res, 404, 'Player not found');
    }

    // If an image is uploaded, handle it
    let playerImageUrl = existingPlayer.image;
    if (req.file) {
      const playerImage = await uploadOnCloudinary(req.file.path);
      if (!playerImage) {
        return ErrorResponse(res, 500, "Internal Cloudinary Error");
      }
      playerImageUrl = playerImage.url; // Update image URL
    }

    // Update player details
    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      {
        $set: {
          ...req.body,  // Update other fields
          image: playerImageUrl, // Update image if uploaded
        },
      },
      { new: true } // Return updated document
    );

    return SuccessResponse(res, 200, 'Player updated successfully', updatedPlayer);
  } catch (error) {
    console.error('Error:', error);
    ErrorResponse(res, 500, 'Internal Server Error!', error);
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.params

    const existingPlayer = await Player.findById(id)

    if (!existingPlayer) {
      return ErrorResponse(res, 404, 'Player not found')
    }

    const deletedPlayer = await Player.findByIdAndDelete(id)

    return SuccessResponse(
      res,
      200,
      'Player deleted successfully',
      deletedPlayer
    )
  } catch (error) {
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.deletePlayers = async (req, res) => {
  try {
    const { ids } = req.body;

    console.log("Received IDs:", ids);

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return ErrorResponse(res, 400, 'Invalid or empty player IDs array');
    }

    // Find existing players
    const existingPlayers = await Player.find({ _id: { $in: ids } });

    if (existingPlayers.length === 0) {
      return ErrorResponse(res, 404, 'No players found');
    }

    // Delete players
    const deletedPlayers = await Player.deleteMany({ _id: { $in: ids } });

    console.log("Deleted Players:", deletedPlayers);

    return SuccessResponse(
      res,
      200,
      `${deletedPlayers.deletedCount} players deleted successfully`,
      deletedPlayers
    );
  } catch (error) {
    console.error("Error:", error);
    ErrorResponse(res, 500, 'Internal Server Error!', error);
  }
};

