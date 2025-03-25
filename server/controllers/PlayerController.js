const { ErrorResponse, SuccessResponse } = require('../utils/response')
const Player = require('../models/player')

exports.addPlayer = async (req, res) => {
  try {
    // const {
    //   domain_name,
    //   emp_id,
    //   pre_score,
    //   severity_count,
    //   total_score,
    //   courses,
    //   image,
    //   gender,
    //   role,
    // } = req.body

    const existingDomainName = Player.findOne(req.body.domain_name)
    if (!existingDomainName) {
      return ErrorResponse(res, 403, 'Domain name already exists')
    }

    const existingEmpID = Player.findOne(req.body.emp_id)
    if (!existingEmpID) {
      return ErrorResponse(res, 403, 'Domain name already exists')
    }

    const player = await Player.create(req.body)

    SuccessResponse(res, 201, 'Player Created Successfully.', player)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.getPlayer = async (req, res) => {
  try {
    const { id } = req.body

    const player = await Player.findById(id)

    if (!player) {
      return ErrorResponse(res, 404, 'Player not found')
    }

    return SuccessResponse(res, 200, '', player)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.getAllPlayers = async (req, res) => {
  try {
    const player = await Player.find()

    if (!player) {
      return ErrorResponse(res, 404, 'Player not found')
    }

    return SuccessResponse(res, 200, '', player)
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.body

    const existingPlayer = await Player.findById(id)

    if (!existingPlayer) {
      return ErrorResponse(res, 404, 'Player not found')
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )

    return SuccessResponse(
      res,
      200,
      'Player updated successfully',
      updatedPlayer
    )
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.body

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
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}

exports.deletePlayers = async (req, res) => {
  try {
    const { ids } = req.body

    const existingPlayers = await Player.find({ _id: { $in: ids } })

    if (existingPlayers === 0) {
      return ErrorResponse(res, 404, 'No players found')
    }

    const deletedPlayers = await Player.deleteMany({ _id: { $in: ids } })

    return SuccessResponse(
      res,
      200,
      `${existingPlayers.length} players deleted successfully`,
      deletedPlayers
    )
  } catch (error) {
    console.log('Error: ', error)
    ErrorResponse(res, 500, 'Internal Server Error!', error)
  }
}
