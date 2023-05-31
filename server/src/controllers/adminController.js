const Student = require('./../model/studentSchema');
const Teacher = require('./../model/teacherSchema');
const Admin = require('./../model/adminSchema');
const Contact = require('./../model/contactSchema');
const jwt = require("jsonwebtoken");
const sendMail = require('./../modules/mail');
require('dotenv').config();


const login = async(req, res) => {
    const {email, password} = req.body;
    try{
        const result = await Admin.findOne({email: email, password: password})
        if(result){
            const token = jwt.sign({ email: email, role:'admin' }, process.env.secret)
            res.json({
                token,
                message: 'Login successful'
            })
        }
        else{
            res.status(400).json({
                message: 'Invalid credentials'
            })
        }
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

// get all students
const getAllStudents = async(req, res) => {
    const students = await Student.find();
    res.json(students);
}

// delete student
const deleteStudent = async(req, res) => {
    const {id} = req.params;
    try{
        const result = await Student.findByIdAndDelete(id);
        res.json(result);
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

// delete teacher
const deleteTeacher = async(req, res) => {
    const {id} = req.params;
    try{
        const result = await Teacher.findByIdAndDelete(id);
        res.json(result);
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

// get all teachers
const getAllTeachers = async(req, res) => {
    const teachers = await Teacher.find();
    res.json(teachers);
}

const sendEmail = async(req, res) => {
    const {email, subject, message, reply} = req.body;
    try{
        await sendMail({ from: process.env.email, to: email, subject: subject, text: `Message: ${message} \n\n Reply: ${reply}`}) 
        const update = await Contact.findOneAndUpdate({email: email}, {status: 'Replied', reply: reply}, {new: true});
        res.status(200).json(update);
    }
    catch(err){
        res.status(400).json(err.message);
    }
}


module.exports = {login, getAllStudents, getAllTeachers, deleteStudent, deleteTeacher, sendEmail}

