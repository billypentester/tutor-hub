const express = require('express')
const router = express.Router()

const {signUp, login, userPanel, emailVerification} = require('../controllers/teacherController')
const {Register, Login} = require('../middleware/basic')
const auth = require('../middleware/auth')

router.post('/teacher/signup', Register, signUp)
router.post('/teacher/login', Login, login)
router.get('/teacher/dashboard', auth, userPanel)
router.get('/teacher/verify/:token', emailVerification)

module.exports = router;