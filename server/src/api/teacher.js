const express = require('express')
const router = express.Router()
const passport = require('passport');
const multer = require('multer')
const path = require('path')

const storage = multer.memoryStorage();
const upload = multer({ storage });

const {signUp, login, userPanel, emailVerification, updateProfile, getAllTeachers, getProfile, searchTeacher, getAppointments, cancelAppointment, acceptAppointment, modifyAppointment, getClassrooms, classroomAnnouncement, classroomNotes} = require('../controllers/teacherController')
const {Register, Login} = require('../middleware/basic')
const auth = require('../middleware/auth')

router.post('/teacher/signup', Register, signUp)
router.post('/teacher/login', Login, login)
router.post('/teacher/details', auth, userPanel)
router.get('/teacher/verify/:token', emailVerification)

router.get('/teacher/search', searchTeacher);

router.post('/teacher/appointment/get', getAppointments)
router.post('/teacher/appointment/cancel', cancelAppointment)
router.post('/teacher/appointment/accept', acceptAppointment)
router.post('/teacher/appointment/modify', modifyAppointment)

router.get('/teacher/profile/:username', getProfile)
router.get('/teacher/all', getAllTeachers)
router.post('/teacher/update',auth, updateProfile)

router.post('/teacher/getclassrooms', getClassrooms)
router.post('/teacher/classroom/update', classroomAnnouncement)
router.post('/teacher/classroom/notes', upload.single('content'), classroomNotes)

router.get('/teacher/createGoogle', passport.authenticate('teacher', {  scope: ['profile', 'email'] }))
router.get('/auth/google/teacher/callback', passport.authenticate('teacher', { failureRedirect: '/teacher/login' }), (req, res) => {
    res.redirect('http://localhost:3000/teacher/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})

router.get('/teacher/useGoogle', passport.authenticate('teacher', {  scope: ['profile', 'email'] }))
router.get('/auth/google/teacher/callback', passport.authenticate('teacher', { failureRedirect: '/teacher/signup' }), (req, res) => {
    res.redirect('http://localhost:3000/teacher/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})


module.exports = router;