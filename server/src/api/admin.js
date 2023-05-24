const express = require('express')
const router = express.Router()

const {login, deleteStudent, deleteTeacher} = require('../controllers/adminController')
const {getStudentCount} = require('../controllers/studentController')
const {getTeacherCount} = require('../controllers/teacherController')
const {getContactCount} = require('../controllers/contactController')
const Appointment = require('./../model/appointmentSchema')
const Teacher = require('./../model/teacherSchema')
const auth = require('../middleware/auth')

// count teachers by city

router.get('/admin/statistics', async(req, res) => {
    try{
        const studentCount = await getStudentCount();
        const teacherCount = await getTeacherCount();
        const contactCount = await getContactCount();
        const appointmentCount = await Appointment.countDocuments();
        const teachers = await Teacher.find();
        const city = teachers.reduce((acc, curr) => {
            const city = curr.city;
            const index = acc.findIndex(item => item.city === city);
            if(index === -1){
                acc.push({city, count: 1})
            }
            else{

                acc[index].count++;
            }
            return acc;
        }, [])
        city.sort((a, b) => b.count - a.count);
        city.splice(12);
        const completion = teachers.reduce((acc, curr) => {
            if(curr.isProfileComplete){
                acc.completed++;
            }
            else{
                acc.notCompleted++;
            }
            return acc;
        }, {completed: 0, notCompleted: 0})
        res.json({studentCount, teacherCount, contactCount, appointmentCount, city, completion})
    }
    catch(err){
        res.status(400).json(err.message);
    }
})

router.get('/appointment/all', async(req, res) => {
    try{
        const appointments = await Appointment.find();
        res.json(appointments)
    }
    catch(err){
        res.status(400).json(err.message);
    }
})

router.post('/admin/login', login)

router.delete('/admin/student/delete/:id', deleteStudent)
router.delete('/admin/teacher/delete/:id', deleteTeacher)


module.exports = router;