import { Schema,model } from "mongoose";


const tournamentSchema = new Schema({
  title: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  totalScore: {
    type: 'number',
    required: true,
  },
  issueCount: {
    type: 'number',
    required: true,
  },
  logo : {
    type : String,
    required : true
  }
})

export const Tournament = model("Tournament",tournamentSchema)