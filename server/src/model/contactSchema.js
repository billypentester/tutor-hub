const mongoose = require("mongoose");
require('../database/connection')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    reply: {
        type: String,
        default: ""
    }
});


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;