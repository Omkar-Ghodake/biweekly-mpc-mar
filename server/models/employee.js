import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
    },
});

export const Employee = model('Employee', employeeSchema);