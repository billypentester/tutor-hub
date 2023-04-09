const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
require('../database/connection')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'student'
    },
    password: {
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    profile:{
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png'
    },
    gender:{
        type: String
    },
    dob:{
        type: String
    },
    contactno:{
        type: String
    },
    city:{
        type: String
    },
    language:{
        type: String
    },
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ],
});

studentSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bycrypt.hash(user.password, 8);
    }
    next();
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;