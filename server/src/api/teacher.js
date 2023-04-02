const express = require('express')
const router = express.Router()
const passport = require('passport');

const {signUp, login, userPanel, emailVerification} = require('../controllers/teacherController')
const {Register, Login} = require('../middleware/basic')
const auth = require('../middleware/auth')

router.post('/teacher/signup', Register, signUp)
router.post('/teacher/login', Login, login)
router.post('/teacher/details', userPanel)
router.get('/teacher/verify/:token', emailVerification)

router.get('/teacher/createGoogle', passport.authenticate('teacher-signup', {  scope: ['profile', 'email'] }))
router.get('/auth/google/teacher/signup/callback', passport.authenticate('teacher-signup', { failureRedirect: '/teacher/login' }), (req, res) => {
    res.redirect('http://localhost:5173/teacher/dashboard?token=' + req.user.tokens[0].token)
})
router.get('/teacher/useGoogle', passport.authenticate('teacher-login', {  scope: ['profile', 'email'] }))
router.get('/auth/google/teacher/login/callback', passport.authenticate('teacher-login', { failureRedirect: '/teacher/signup' }), (req, res) => {
    res.redirect('http://localhost:5173/teacher/dashboard?token=' + req.user.tokens[0].token)
})


module.exports = router;