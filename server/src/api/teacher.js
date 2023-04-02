const express = require('express')
const router = express.Router()
const passport = require('passport');

const {signUp, login, userPanel, emailVerification, getUser} = require('../controllers/teacherController')
const {Register, Login} = require('../middleware/basic')
const auth = require('../middleware/auth')

router.get('/teacher/details/:id', getUser)
router.post('/teacher/signup', Register, signUp)
router.post('/teacher/login', Login, login)
router.get('/teacher/dashboard', auth, userPanel)
router.get('/teacher/verify/:token', emailVerification)

router.get('/teacher/createGoogle', passport.authenticate('teacher-signup', {  scope: ['profile', 'email'] }))
router.get('/auth/google/teacher/signup/callback', passport.authenticate('teacher-signup', { failureRedirect: '/teacher/login' }), (req, res) => {
    if(req.user.message) return res.json({msg: req.user.message})
    res.cookie('token', req.user.tokens[0].token)
    res.redirect('/teacher/dashboard')
})
router.get('/teacher/useGoogle', passport.authenticate('teacher-login', {  scope: ['profile', 'email'] }))
router.get('/auth/google/teacher/login/callback', passport.authenticate('teacher-login', { failureRedirect: '/teacher/signup' }), (req, res) => {

    if(req.user.message) return res.json({msg: req.user.message})
    res.cookie('token', req.user.tokens[0].token)
    res.redirect('/teacher/dashboard')

})

router.get('/teacher/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/teacher/login')
})

module.exports = router;