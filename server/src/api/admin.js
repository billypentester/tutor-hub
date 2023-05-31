const express = require('express')
const router = express.Router()

const {login, deleteStudent, deleteTeacher, sendEmail} = require('../controllers/adminController')
const {getStudentCount} = require('../controllers/studentController')
const {getTeacherCount} = require('../controllers/teacherController')
const {getContactCount} = require('../controllers/contactController')
const Appointment = require('./../model/appointmentSchema')
const Teacher = require('./../model/teacherSchema')
const auth = require('../middleware/auth')

// count teachers by city

router.post('/admin/message/send', sendEmail)

router.get('/admin/statistics', async(req, res) => {
    try{
        const studentCount = await getStudentCount();
        const teacherCount = await getTeacherCount();
        const contactCount = await getContactCount();
        const appointmentCount = await Appointment.countDocuments();
        const teachers = await Teacher.find();
        const city = cityStat(teachers);
        const completion = completionStat(teachers);
        const gender = genderStat(teachers);
        const rate = rating(teachers)
        res.json({studentCount, teacherCount, contactCount, appointmentCount, city, completion, gender, rate})
    }
    catch(err){
        console.log(err.message);
        res.status(400).json(err.message);
    }
})

const completionStat = (teachers) => {
    const completion = teachers.reduce((acc, curr) => {
        if(curr.isProfileComplete){
            acc.completed++;
        }
        else{
            acc.notCompleted++;
        }
        return acc;
    }, {completed: 0, notCompleted: 0})
    return completion;
}

const genderStat = (teachers) => {
    const gender = teachers.reduce((acc, curr) => {
        if(curr.gender === 'Male'){
            acc.male ++;
        }
        else{
            acc.female ++;
        }
            return acc;
        }, {male: 0, female: 0})
        return gender;
}

const cityStat = (teachers) => {
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
    return city;
}

const rating = (teachers) => {
    const rating = teachers.reduce((acc, curr) => {
        const rating = curr.rating;
        if(rating >= 4.5){
            acc.fourHalf++;
        }
        else if(rating >= 4){
            acc.four++;
        }
        else if(rating >= 3){
            acc.three++;
        }
        else if(rating >= 2){
            acc.two++;
        }
        else if(rating >= 1){
            acc.one++;
        }
        else{
            acc.zero++;
        }
        return acc;
    }, {fourHalf: 0, four: 0, three: 0, two: 0, one: 0, zero: 0})
    return rating;
}
            

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