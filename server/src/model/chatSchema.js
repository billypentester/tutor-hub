const mongoose = require("mongoose");
require('../database/connection')

const chatSchema = new mongoose.Schema({
    participants: [
        {
            name: String,
            profile: String,
            username: String
        }
    ],
    messages: [
        {
            sender: {
                type: String,
            },
            text: {
                type: String,
            },
            time: {
                type: Date,
                required: true,
                default: Date.now()
            }
        }
    ]
});


const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;