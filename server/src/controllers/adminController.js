const Student = require('./../model/studentSchema');
const Teacher = require('./../model/teacherSchema');
const mail = require('./../modules/mail');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const login = async(req, res) => {

    const {email, password} = req.body;

    if(!email || !password) return res.status(400).json({msg: 'Please enter all fields'})
    if(email === process.env.adminEmail && password === process.env.adminPassword){
        const token = jwt.sign({ email: email, role:'admin'  }, process.env.secret , { expiresIn: "1h" })
        res.cookie('token', token);
        res.json({msg: 'Login successful'})
    }
    else{
        res.status(400).json({msg: 'Invalid credentials'})
    }

}

// get all students

const getAllStudents = async(req, res) => {
    const students = await Student.find();
    res.json(students);
}

// get all teachers
const getAllTeachers = async(req, res) => {
    const teachers = await Teacher.find();
    res.json(teachers);
}

const logout = (req, res) => {
    res.clearCookie('token')
    res.redirect('/admin/login')
}





module.exports = {login, getAllStudents, getAllTeachers, logout}

