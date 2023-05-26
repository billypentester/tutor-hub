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
                    name: String,
                    link: String,
                }
            ],
            assignments: [
                {
                    name: String,
                    link: String,
                }
            ],
            notes: [
                {
                    name: String,
                    link: String,
                }
            ]
        }
    ],
    announcements: [
        {
            title: String,
            content: String,
            time: {
                type: Date,
                required: true,
                default: Date.now()
            }
        }
    ]
});


const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;