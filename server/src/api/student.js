const express = require('express')
const router = express.Router()
const Classroom = require('./../model/classroomSchema')
const Teacher = require('./../model/teacherSchema')

const {signUp, login, userPanel, emailVerification, getAllStudents, getStudentCount, deleteStudent, updateStudent, appointment, getAppointments, deleteAppointment, updateAppointment, payment} = require('../controllers/studentController')
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

router.get('/student/createGoogle', passport.authenticate('student', { scope: ['profile', 'email'] }))
router.get('/auth/google/student/callback', passport.authenticate('student', { failureRedirect: '/student/signup' }), (req, res) => {
    res.redirect('http://localhost:3000/student/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})

router.get('/student/useGoogle', passport.authenticate('student', {  scope: ['profile', 'email'] }))
router.get('/auth/google/student/callback', passport.authenticate('student', { failureRedirect: '/student/login' }), (req, res) => {
    res.redirect('http://localhost:3000/student/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})

const saveData = async(req, res, next) => {

    console.log(req.query)
    const multipleSubjects = req.query.multipleSubjects.split(',')
    const subjects = multipleSubjects.map(subject => ({ name: subject }))

    const count = await Classroom.countDocuments()
    const result =  await Teacher.findOne({username: req.query.teacher})

    const data = {
        name: `Classroom ${count+1}`,
        teacher: req.query.teacher,
        student: req.query.student,
        subjects: subjects,
        schedule:{
            startTime: result.availability.startDate,
            endTime: result.availability.endDate,
        }
    }

    const classroom = new Classroom(data)
    console.log(classroom)
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
