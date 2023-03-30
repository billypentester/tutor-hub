const express = require('express')
const router = express.Router()

const {login, getAllStudents, getAllTeachers ,logout} = require('../controllers/adminController')
const auth = require('../middleware/auth')

router.post('/admin/login', login)
router.get('/admin/students',auth, getAllStudents)
router.get('/admin/teachers',auth, getAllTeachers)
router.get('/admin/logout',auth, logout)


module.exports = router;