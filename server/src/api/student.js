const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51JollnA5bS3TR9OlwjYRegDHSBYnVRFPjtiMw8nNZ9E29RhPRS8UFyq0BcrWU9v50WlwzirpHIjDdJgDU0rC7cFN00yCeBC18u');

const {signUp, login, userPanel, emailVerification, getAllStudents, getStudentCount, deleteStudent, updateStudent, appointment, getAppointments} = require('../controllers/studentController')
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

router.get('/student/payment/', async (req, res) => {
    const data = {
        fee: req.query.fee,
        teacher: req.query.teacher,
        student: req.query.student,
        multipleSubjects: JSON.parse(req.query.multipleSubjects),
        quantity: JSON.parse(req.query.multipleSubjects).length
    }
    console.log(data)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: data.multipleSubjects.map((subject) => {
            return {
                price_data: {
                    currency: 'pkr',
                    product_data: {
                        name: subject,
                        images: ['https://i.imgur.com/EHyR2nP.png'],
                    },
                    unit_amount: data.fee * 100
                },
                quantity: 1
            }
        }),
        mode: 'payment',
        success_url: 'http://localhost:3000/student/dashboard',
        cancel_url: 'http://localhost:3000/student/dashboard',
    
    });
    console.log(session)
    res.redirect(session.url)
});





module.exports = router;