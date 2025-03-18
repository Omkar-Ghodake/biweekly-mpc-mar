import mongoose, { Schema, model } from "mongoose";

const playerSchema = new Schema(
    {
        domain_name: {
            type: String,
            required: true,
            unique: true,
            trim: true, 
        },
        emp_id: {
            type: mongoose.Types.Long, 
            required: true,
            unique: true,
        },
        pre_score: {
            type: Number,
            default: 0, 
        },
        severity_count: {
            blocker: { type: Number, default: 0 },
            critical: { type: Number, default: 0 },
            major: { type: Number, default: 0 },
            normal: { type: Number, default: 0 },
            minor: { type: Number, default: 0 },
        },
        total_score: {
            type: Number,
            default: 0,
        },
        courses: {
            type: [String], // Ensures it's an array of strings
            default: [],
        },
        image: {
            type: String,
            default: "", 
        },
    },
);

export const Player = model("Player", playerSchema);
