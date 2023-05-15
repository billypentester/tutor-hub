const Student = require('./../model/studentSchema');
const Appointment =  require('./../model/appointmentSchema')
const Teacher = require('./../model/teacherSchema')
const mail = require('./../modules/mail');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const signUp = async(req, res) => {

    try{
        const {name, email, password, username} = req.body;
        const student = new Student({name, email, password, username})

        const token = jwt.sign({ email: email, role:'student'  }, process.env.secret)
        student.tokens = student.tokens.concat({ token : token })
        res.cookie('token', token);
        await student.save();

        const verificationLink = `http://localhost:5000/student/verify/${token}`
        await mail({ from: process.env.email, to: email, subject: 'Email verification', text: `Please click on the following link to verify your email: ${verificationLink}`})

        res.status(200).json({ msg: 'Student created successfully'})
    }
    catch(err){
        res.status(400).json(err.message);
    }

}

const login = async(req, res) => {

    const student = req.user;

    const token = jwt.sign({ email: student.email, role:'student' }, process.env.secret)
    student.tokens = student.tokens.concat({ token : token })
    
    await student.save();
   
    res.json({token: token})

}

const emailVerification = (req, res) => {

    const token = req.params.token
    jwt.verify(token, process.env.secret, (err, decoded) => {
        if(err){
            res.status(400).json({msg: 'Invalid token'})
        }
        else{
            Student.findOne({email: decoded.email}).then((student) => {
                student.isVerified = true
                student.save()
                res.redirect(`http://localhost:5173/signup/verify/student/${student.isVerified}`)
            })
        }
    })
}
    

const userPanel = async(req, res) => {

    try{
        const {token} = req.body;
        const decoded = jwt.verify(token, process.env.secret)
        const student = await Student.findOne({email: decoded.email})
        res.json(student)
    }
    catch(err){
        res.status(400).json(err.message);
    }

}

const getAllStudents = async(req, res) => {
    try{
        const students = await Student.find()
        res.json(students)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const getStudentCount = async(req, res) => {
    
    const count = await Student.countDocuments()
    return count;

}

const deleteStudent = async(req, res) => {
    try{
        const {email} = req.body;
        console.log(email)
        if(req.user.email == email){
            await Student.findOneAndDelete({email: email})
            res.json({msg: 'Student deleted successfully'})
        }
        else{
            res.status(400).json({msg: 'You are not authorized to delete the account'})
        }
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const updateStudent = async(req, res) => {
    try{
        const {data} = req.body;
        console.log(data)
        if(req.user.email == data.email){
            const result = await Student.findOneAndUpdate({email: data.email}, data, {new: true})
            res.json(result);
        }
    }
    catch(err){
        res.status(400).json(err.msg);
    }
}


const appointment = async(req, res) => {
    try{
        const {student, teacher, appointmentDate, appointmentTime, duration, notes} = req.body;
        const appointment = new Appointment({student, teacher, appointmentDate, appointmentTime, duration, notes})
        const result = await appointment.save();
        console.log(result)
        res.status(200).json({ msg: 'Appointment created successfully'})
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const getAppointments = async(req, res) => {
    try{
        const {student} = req.body;
        const appointments = await Appointment.find({student: student})
        if(appointments){
            const teachers = await Teacher.find({username: {$in: appointments.map((appointment) => appointment.teacher)}})
            const result = appointments.map((appointment) => {
                const teacher = teachers.find((teacher) => teacher.username == appointment.teacher)
                return {...appointment._doc, teacher: {profile: teacher.profile, name: teacher.name, username: teacher.username}}
            })
            result.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            res.json(result)
        }
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

module.exports = {signUp, login, emailVerification, userPanel, getAllStudents, getStudentCount, deleteStudent, updateStudent, appointment, getAppointments}

