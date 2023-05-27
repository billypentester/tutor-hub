const Teacher = require('../model/teacherSchema')
const Appointment = require('../model/appointmentSchema')
const Student = require('../model/studentSchema')
const Classroom = require('../model/classroomSchema')
const jwt = require("jsonwebtoken");
require('dotenv').config();
const mail = require('./../modules/mail');


const signUp = async(req, res) => {

    try{
        const {name, email, username, password} = req.body;
        const teacher = new Teacher({name, email, username, password})

        const token = jwt.sign({ email: email, role:'teacher'  }, process.env.secret)
        teacher.tokens = teacher.tokens.concat({ token : token })
        await teacher.save();

        const verificationLink = `http://localhost:5000/teacher/verify/${token}`
        await mail({ from: process.env.email, to: email, subject: 'Email verification', text: `Please click on the following link to verify your email: ${verificationLink}`})

        res.json({ msg: 'Teacher created successfully' })
    }
    catch(err){
        res.status(400).send(err.message);
    }

}

const login = async(req, res) => {

    const teacher = req.user;

    const token = jwt.sign({ email: teacher.email, role:'teacher'  }, process.env.secret)
    teacher.tokens = teacher.tokens.concat({ token : token })
    
    await teacher.save();
    res.cookie('token', token);

    res.json({token: token, teacher: teacher})

}

const emailVerification = (req, res) => {

    const token = req.params.token
    jwt.verify(token, process.env.secret, (err, decoded) => {
        if(err){
            res.status(400).json({msg: 'Invalid token'})
        }
        else{
            Teacher.findOne({email: decoded.email}).then((teacher) => {
                teacher.isVerified = true
                teacher.save()
                res.redirect(`http://localhost:3000/verify/student/${teacher.isVerified}`)
            })
        }
    })

}

const userPanel = async(req, res) => {

    try{
        const teacher = req.user;
        res.json(teacher)
    }
    catch(err){
        res.status(400).json(err.message);
    }

}

const getAllTeachers = async(req, res) => {
    try{
        const teachers = await Teacher.find()
        res.json(teachers)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const updateProfile = async(req, res) => {

    try{
        const { teacher } = req.body;
        console.log(teacher)
        const { id } = req.user;
        const updation = await Teacher.findByIdAndUpdate(id, teacher, {new: true})
        res.json(updation)
    }
    catch(err){
        res.status(400).json(err.message);
    }

}

const deleteProfile =  async(req, res) => {
    try{
        const {email} = req.body;
        const { id } = req.user;
        const deletion =  await Teacher.findByIdAndDelete(id)  
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const getTeacherCount = async(req, res) => {
   
    const count = await Teacher.countDocuments()
    return count;
   
}

const getProfile = async(req, res) => {
    try{
        const { username } = req.params;
        const teacher = await Teacher.findOne({username: username})
        teacher.isProfileComplete == false ? res.status(400).json({msg: 'Teacher not found'}) : res.json(teacher)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const searchTeacher = async(req, res) => {
    try{
        const teachers = await Teacher.find();
        const result = teachers
                                .filter((obj) => obj.isProfileComplete === true)
                                .map((obj) => {
                                    return {
                                        name: obj.name,
                                        username: obj.username,
                                        profile: obj.profile,
                                        city: obj.city,
                                        rating: obj.rating,
                                        experience: obj.experience.experience,
                                        subjectType: obj.experience.subjectType,
                                        subjectLevel: obj.experience.subjectLevel,
                                        expertise: obj.experience.expertise,
                                        fee: obj.availability.fee,
                                        location: obj.availability.location,
                                    }
                                })
        res.json(result)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const getAppointments = async(req, res) => {
    try{
        const {teacher} = req.body;
        const appointments = await Appointment.find({teacher: teacher})
        if(appointments){
            const students = await Student.find({username: {$in: appointments.map((appointment) => appointment.student)}})
            const result = appointments.map((appointment) => {
                const student = students.find((student) => student.username == appointment.student)
                return {...appointment._doc, student: {profile: student.profile, name: student.name, username: student.username}}
            })
            result.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            res.json(result)
        }
        else{
            res.status(400).json({msg: 'No appointments found'})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err.message);
    }
}

const cancelAppointment = async(req, res) => {
    try{
        const {appointment} = req.body;
        const cancellation = await Appointment.findByIdAndUpdate(appointment, {status: 'Cancelled', notes: 'Appointment cancelled by teacher'}, {new: true})
        res.json(cancellation)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const acceptAppointment = async(req, res) => {
    try{
        const {appointment, link} = req.body;
        const updation = await Appointment.findByIdAndUpdate(appointment, {status: 'Accepted', notes: `Please join the meeting using the following link: ${link}`}, {new: true})
        res.json(updation)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

function formatTime(timeStr) {
    let [hours, minutes] = timeStr.split(":").map(Number);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
}

const modifyAppointment = async(req, res) => {
    try{
        const {appointment, date, time} = req.body;
        console.log(appointment, date, time)
        const updation = await Appointment.findByIdAndUpdate(appointment, { notes: `Teacher has requested to modify the appointment to ${formatDate(date)} at ${formatTime(time)}`}, {new: true})
        res.json(updation)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const getClassrooms = async(req, res) => {
    try{
        console.log(req.body)
        const classrooms = await Classroom.find({'teacher.username': req.body.username})
        res.status(200).json(classrooms)
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
}

const classroomAnnouncement = async(req, res) => {
    try{
        console.log(req.body)
        const {classroom, announcement} = req.body;
        const update = await Classroom.findByIdAndUpdate(classroom, { $push: { announcements: announcement } }, {new: true})
        // set announcements in descending order
        update.announcements.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        res.status(200).json(update)
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
}



module.exports = {signUp, login, userPanel, emailVerification, updateProfile, getAllTeachers, deleteProfile, getTeacherCount, getProfile, searchTeacher, getAppointments, cancelAppointment, acceptAppointment, modifyAppointment, getClassrooms, classroomAnnouncement}

