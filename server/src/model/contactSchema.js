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
    }
});


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;