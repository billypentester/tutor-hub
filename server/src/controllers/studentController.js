const Student = require('./../model/studentSchema');
const Appointment =  require('./../model/appointmentSchema')
const Teacher = require('./../model/teacherSchema')
const Classroom = require('./../model/classroomSchema')
const mail = require('./../modules/mail');
const stripe = require('stripe')('sk_test_51JollnA5bS3TR9OlwjYRegDHSBYnVRFPjtiMw8nNZ9E29RhPRS8UFyq0BcrWU9v50WlwzirpHIjDdJgDU0rC7cFN00yCeBC18u');
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
                res.redirect(`http://localhost:3000/verify/student/${student.isVerified}`)
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

const deleteAppointment = async(req, res) => {
    try{
        const {appointment} = req.body;
        const result = await Appointment.findOneAndDelete({_id: appointment})
        res.json(result)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

function formatTime(timeStr) {
    let [hours, minutes] = timeStr.split(":").map(Number);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
}

const updateAppointment = async(req, res) => {
    try{
        const {appointment, date, time} = req.body;
        const result = await Appointment.findOneAndUpdate({_id: appointment}, {appointmentDate: date, appointmentTime: time, notes: `Student updated the appointment on ${formatDate(date)} at ${formatTime(time)}`}, {new: true})
        res.json(result)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const payment = async (req, res) => {
    const data = {
        fee: req.query.fee,
        teacher: req.query.teacher,
        student: req.query.student,
        multipleSubjects: JSON.parse(req.query.multipleSubjects),
        quantity: JSON.parse(req.query.multipleSubjects).length
    }
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
                    unit_amount: parseInt(data.fee) * 100
                },
                quantity: 1
            }
        }),
        mode: 'payment',
        success_url: `http://localhost:5000/payment/success?teacher=${data.teacher}&student=${data.student}&multipleSubjects=${data.multipleSubjects}`,
        cancel_url: `http://localhost:5000/payment/cancel/`
    });
    res.redirect(session.url)
}

const getClassrooms = async(req, res) => {
    try{
        const classrooms = await Classroom.find({'student.username': req.body.username})
        res.status(200).json(classrooms)
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
}

const getClass = async(req, res) => {
    try{
        const {id} = req.params;
        console.log(id)
        const result = await Classroom.findOne({_id: id})
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const uploadAssignment = async(req, res) => {
    try{
        const {classroom, subject, assignment, link} = req.body;
        const filename = req.file == undefined ? '' : req.file.filename;
        const result = await Classroom.findOne({_id: classroom})
        if(result){
            const sub = result.subjects.find((sub) => sub._id == subject)
            const assesment = sub.assignments.find((assesment) => assesment._id == assignment)
            assesment.link = link;
            assesment.answer = filename == '' ? '' : `/api/public/${filename}`
            assesment.uploadDate = new Date();
            await result.save();
            const newClassroom = await Classroom.findOne({_id: classroom})
            res.status(200).json(newClassroom)
        }
        else{
            res.status(400).json({msg: 'Classroom not found'})
        }   
    }
    catch(err){
        console.log(err)
        res.status(400).json(err.message);
    }
}

const uploadQuiz = async(req, res) => {
    try{
        const {classroom, subject, quiz, link} = req.body;
        const filename = req.file == undefined ? '' : req.file.filename;
        const result = await Classroom.findOne({_id: classroom})
        if(result){
            const sub = result.subjects.find((sub) => sub._id == subject)
            const assesment = sub.quizzes.find((assesment) => assesment._id == quiz)
            assesment.link = link;
            assesment.answer = filename == '' ? '' : `/api/public/${filename}`
            assesment.uploadDate = new Date();
            await result.save();
            const newClassroom = await Classroom.findOne({_id: classroom})
            res.status(200).json(newClassroom)
        }
        else{
            res.status(400).json({msg: 'Classroom not found'})
        }   
    }
    catch(err){
        console.log(err)
        res.status(400).json(err.message);
    }
}


module.exports = {signUp, login, emailVerification, userPanel, getAllStudents, getStudentCount, deleteStudent, updateStudent, appointment, getAppointments, updateAppointment, deleteAppointment, payment, getClassrooms, getClass, uploadAssignment, uploadQuiz}

