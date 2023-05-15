const mongoose = require("mongoose");
require('../database/connection')

const appointmentSchema = new mongoose.Schema({
    student:{
        type: String,
        required: true
    },
    teacher:{
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        default: "Pending",
        required: true
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;