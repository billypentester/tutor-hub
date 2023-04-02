const express = require('express')
const router = express.Router()

const {signUp, login, userPanel, emailVerification, getUser} = require('../controllers/studentController')
const {Register, Login} = require('../middleware/basic')
const auth = require('../middleware/auth')

const jwt = require('jsonwebtoken')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

// router.get('/student/details/:id', getUser)
router.post('/student/signup', Register, signUp)
router.post('/student/login', Login, login)
router.get('/student/details', userPanel)
router.get('/student/verify/:token', emailVerification)

router.get('/student/createGoogle', passport.authenticate('student-signup', {  scope: ['profile', 'email'] }))
router.get('/auth/google/student/signup/callback', passport.authenticate('student-signup', { failureRedirect: '/student/login' }), (req, res) => {
    if(req.user.message) return res.json({msg: req.user.message})
    res.redirect('/student/details')
})

router.get('/student/useGoogle', passport.authenticate('student-login', {  scope: ['profile', 'email'] }))
router.get('/auth/google/student/login/callback', passport.authenticate('student-login', { failureRedirect: '/student/signup' }), (req, res) => {
    if(req.user.message) return res.json({msg: req.user.message})
    res.redirect('/student/details')
})

router.get('/student/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/student/login')
})



module.exports = router;