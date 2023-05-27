const express = require('express')
const router = express.Router()
const Classroom = require('./../model/classroomSchema')
const Teacher = require('./../model/teacherSchema')
const Student = require('./../model/studentSchema')

const {signUp, login, userPanel, emailVerification, getAllStudents, getStudentCount, deleteStudent, updateStudent, appointment, getAppointments, deleteAppointment, updateAppointment, payment, getClassrooms, getClass} = require('../controllers/studentController')
const {Register, Login} = require('../middleware/basic')
const auth = require('../middleware/auth')

const jwt = require('jsonwebtoken')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

router.post('/student/signup', Register, signUp)
router.post('/student/login', Login, login)
router.post('/student/details',auth, userPanel)
router.get('/student/verify/:token', emailVerification)

router.post('/student/appointment', appointment)
router.post('/student/appointment/get', getAppointments)
router.post('/student/appointment/delete', deleteAppointment)
router.post('/student/appointment/update', updateAppointment)

router.get('/student/all', getAllStudents)
router.get('/student/count', getStudentCount)
router.post('/student/delete', auth, deleteStudent)
router.post('/student/update', auth, updateStudent)
router.post('/student/getclassrooms', getClassrooms)
router.get('/student/getclass/:id', getClass)

router.get('/student/createGoogle', passport.authenticate('student', { scope: ['profile', 'email'] }))
router.get('/auth/google/student/callback', passport.authenticate('student', { failureRedirect: '/student/signup' }), (req, res) => {
    res.redirect('http://localhost:3000/student/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})

router.get('/student/useGoogle', passport.authenticate('student', {  scope: ['profile', 'email'] }))
router.get('/auth/google/student/callback', passport.authenticate('student', { failureRedirect: '/student/login' }), (req, res) => {
    res.redirect('http://localhost:3000/student/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})

const saveData = async(req, res, next) => {

    const multipleSubjects = req.query.multipleSubjects.split(',')
    const subjects = multipleSubjects.map(subject => ({ name: subject }))

    const count = await Classroom.countDocuments()
    const result =  await Teacher.findOne({username: req.query.teacher})
    const result2 = await Student.findOne({username: req.query.student})

    const data = {
        name: `Classroom ${count+1}`,
        teacher: {
            name: result.name,
            username: result.username,
            profile: result.profile,
        },
        student: {
            name: result2.name,
            username: result2.username,
            profile: result2.profile,
        },
        subjects: subjects,
        schedule:{
            startTime: result.availability.startDate,
            endTime: result.availability.endDate,
        }
    }

    const classroom = new Classroom(data)
    await classroom.save()
    next()
}

router.get('/student/payment/', payment)

router.get('/payment/success/', saveData, (req, res) => {
    res.redirect('http://localhost:3000/student/dashboard/classroom')
})

router.get('/payment/cancel', (req, res) => {
    res.redirect('http://localhost:3000/student/dashboard')
})




module.exports = router;
