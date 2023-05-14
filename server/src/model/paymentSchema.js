const mongoose = require("mongoose");
require('../database/connection')

const paymentSchema = new mongoose.Schema({
    teacher: {
        type: String,
        required: true
    },
    student: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: Date.now()
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;