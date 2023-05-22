const Student = require('./../model/studentSchema');
const Teacher = require('./../model/teacherSchema');
const Admin = require('./../model/adminSchema');
const jwt = require("jsonwebtoken");
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





module.exports = {login, getAllStudents, getAllTeachers, deleteStudent, deleteTeacher}

