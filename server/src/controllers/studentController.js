const Student = require('./../model/studentSchema');
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
        if(req.user.email == data.email){
            await Student.findOneAndUpdate({email: data.email}, data, {new: true})
            res.json({msg: 'Student updated successfully'})
        }
    }
    catch(err){
        res.status(400).json(err.msg);
    }
}


module.exports = {signUp, login,  emailVerification, userPanel, getAllStudents, getStudentCount, deleteStudent, updateStudent}

