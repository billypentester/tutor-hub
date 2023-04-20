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
    profile:String,
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'teacher'
    },
    gender:{
        type: String
    },
    age:{
        type: Number
    },
    contactno:{
        type: Number
    },
    language:{
        type: String
    },
    city:{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    education:{
        qualification:String,
        marks:String,
        confirmation:Boolean
    },
    experience:{
        experience:String,
        interest:String,
        expertise:String,
        subjectLevel:String,
        subjectType:String,
        multipleSubject:[String]
    },
    availability:{
        hours:Number,
        startDate:String,
        endDate:String,
        days:[String],
        timeslot:[String],
        location:[Number]
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