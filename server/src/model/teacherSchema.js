const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
require('../database/connection')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactno: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'teacher'
    },
    password: {
        type: String,
        required: true
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

teacherSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bycrypt.hash(user.password, 8);
    }
    next();
})

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;