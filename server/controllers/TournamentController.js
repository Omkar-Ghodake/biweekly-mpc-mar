const Tournament = require('../models/tournament')
const { uploadOnCloudinary } = require('../utils/cloudinary')
const TournamentModel = require('../models/tournament')
const { SuccessResponse, ErrorResponse } = require('../utils/response')
const { default: mongoose } = require('mongoose')

exports.createTournament = async (req, res) => {
  try {
    const { title, description, totalScore, issueCount } = req.body

    const logoLocalPath = req.file?.path
    console.log(logoLocalPath);
    
    if (!logoLocalPath) {
      throw new Error('Logo is required')
    }

    const logo = await uploadOnCloudinary(logoLocalPath)

    if (!logo) {
      throw new Error(400, 'Unable to fetch logo from cloudinary')
    }

    const tournament = await Tournament.create({
      title,
      description,
      totalScore,
      issueCount,
      logo: logo.url,
    })

    SuccessResponse(res, 201, 'Tournament Created Successfully.', tournament)
  } catch (error) {
    console.log('Error: ', error)
    return ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.updateTournament = async (req, res) => {
  try {
    const { id } = req.params

    let tournament = await Tournament.findById(id)

    if (!tournament) {
      console.log('No Tournament Data found!')
      return ErrorResponse(
        res,
        404,
        'No Tournament Data Found!',
        new Error('Could not find Tournament with the given ID!')
      )
    }

    let tournamentLogoUrl = tournament.logo;

    if (req.file) {
      const imagePath = req.file.path
      console.log('New Image Path:', imagePath)

      const uploadedImage = await uploadOnCloudinary(imagePath)
      console.log('Uploaded Image URL:', uploadedImage)

      if (!uploadedImage) {
        return ErrorResponse(res, 500, 'Image upload failed')
      }

      tournamentLogoUrl = uploadedImage.url
    }
    let updatedData = JSON.parse(JSON.stringify({ ...req.body, logo: tournamentLogoUrl }));
    console.log("updatedData",updatedData);
    
    const newTournament = await Tournament.findByIdAndUpdate(id, { $set: updatedData }, {
      new: true,
    })
    console.log("tournament",newTournament);
    
    return SuccessResponse(
      res,
      200,
      `Tournament with ID ${id} updated successfully`,
      newTournament
    )
  } catch (error) {
    console.error('Error:', error)
    return ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.deleteTournament = async (req, res) => {
  try {
    const result = await TournamentModel.deleteOne({ _id: req.params.id })

    if (result.deletedCount === 0) {
      console.log('No Tournament Found!')
      return ErrorResponse(
        res,
        404,
        'No Tournament Data Found!',
        new Error('Could not find Tournament with the given ID!')
      )
    }
    SuccessResponse(
      res,
      201,
      `Tournament Deleted: Affected ${result.deletedCount} tournament.`,
      result
    )
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error', error)
  }
}

exports.deleteManyTournament = async (req, res, next) => {
  try {
    const tournamentIds = await req.body.ids

    if (!tournamentIds) {
      console.log('No Tournament Id recieved!')
      return ErrorResponse(res, 400, 'No Tournament Id Recieved!')
    }
    const deleted = await TournamentModel.deleteMany({
      _id: { $in: tournamentIds },
    })

    if (!deleted.deletedCount) {
      console.log('No Tournament with given Id')
      return ErrorResponse(res, 400, 'No Tournament with given Id!')
    }

    SuccessResponse(
      res,
      201,
      `Tournament Deleted: Affected ${deleted.deletedCount} tournament.`,
      deleted
    )
  } catch (error) {
    console.error('Error:', error)
    return ErrorResponse(res, 500, 'Internal Server Error', error)
  }
}

exports.getAllTournament = async (req, res) => {
  try {
    const tournaments = await TournamentModel.find()

    //No data found!
    if (!tournaments) {
      console.log('No Tournament Data found!')
      return ErrorResponse(res, 404, 'No Tournament Data Found!')
    }

    //If data is found
    SuccessResponse(
      res,
      201,
      `Successfully Fetched ${tournaments.length} Tournaments.`,
      tournaments
    )
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error', error)
  }
}

exports.getOneTournament = async (req, res) => {
  try {
    const tournament = await TournamentModel.findById(req.params.id)

    //No data found!
    if (!tournament) {
      console.log('No Tournament Data found!')
      return ErrorResponse(
        res,
        404,
        `Tournament with id: ${req.params.id} Not Found `
      )
    }

    //If data is found
    SuccessResponse(
      res,
      201,
      `Successfully Fetched Tournament with Tournament Id: ${req.params.id}`,
      tournament
    )
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error', error)
  }
}
