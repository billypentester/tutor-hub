const express = require('express')
const router = express.Router()

const {login, logout} = require('../controllers/adminController')
const {getStudentCount} = require('../controllers/studentController')
const {getTeacherCount} = require('../controllers/teacherController')
const {getContactCount} = require('../controllers/contactController')
const auth = require('../middleware/auth')

router.get('/admin/statistics', async(req, res) => {
    try{
        const studentCount = await getStudentCount();
        const teacherCount = await getTeacherCount();
        const contactCount = await getContactCount();
        res.json({studentCount, teacherCount, contactCount})
    }
    catch(err){
        res.status(400).json(err.message);
    }
})

router.post('/admin/login', login)
router.get('/admin/logout',auth, logout)


module.exports = router;