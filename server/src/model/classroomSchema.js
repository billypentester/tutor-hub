const mongoose = require("mongoose");
require('../database/connection')

const classroomSchema = new mongoose.Schema({
    name: String,
    student: {
        name: String,
        username: String,
        profile: String,
    },
    teacher: {
        name: String,
        username: String,
        profile: String,
    },
    schedule: {
        startTime: String,
        endTime: String
    },
    subjects: [
        {
            name: String,
            quizzes: [
                {
                    title:String,
                    description:String,
                    link:String,
                    content:String,
                    answer: String,
                    createdAt:{
                        type:Date,
                        default:Date.now()
                    },
                    dueDate:String,
                    uploadDate:String
                }
            ],
            assignments: [
                {
                    title:String,
                    description:String,
                    link:String,
                    content:String,
                    answer: String,
                    createdAt:{
                        type:Date,
                        default:Date.now()
                    },
                    dueDate:Date,
                    uploadDate:String
                }
            ],
            notes: [
                {
                    title:String,
                    description:String,
                    link:String,
                    content:String,
                    date:{
                        type:Date,
                        default:Date.now()
                    }
                }
            ]
        }
    ],
    announcements: [
        {
            title: String,
            description: String,
            time: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});


const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;