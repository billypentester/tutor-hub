const express = require('express')
const router = express.Router()

const {signUp, login, userPanel, emailVerification } = require('../controllers/studentController')
const {Register, Login} = require('../middleware/basic')
const auth = require('../middleware/auth')

const jwt = require('jsonwebtoken')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

router.post('/student/signup', Register, signUp)
router.post('/student/login', Login, login)
router.post('/student/details',auth, userPanel)
router.get('/student/verify/:token', emailVerification)


router.get('/student/createGoogle', passport.authenticate('student-signup', { scope: ['profile', 'email'] }))
router.get('/auth/google/student/signup/callback', passport.authenticate('student-signup', { failureRedirect: '/student/signup' }), (req, res) => {
    res.redirect('http://localhost:5173/student/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})

router.get('/student/useGoogle', passport.authenticate('student-login', {  scope: ['profile', 'email'] }))
router.get('/auth/google/student/login/callback', passport.authenticate('student-login', { failureRedirect: '/student/login' }), (req, res) => {
    res.redirect('http://localhost:5173/student/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})



module.exports = router;