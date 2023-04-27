const Teacher = require('../model/teacherSchema')
const jwt = require("jsonwebtoken");
require('dotenv').config();
const mail = require('./../modules/mail');


const signUp = async(req, res) => {

    try{
        const {name, email, username, password} = req.body;
        const teacher = new Teacher({name, email, username, password})

        const token = jwt.sign({ email: email, role:'teacher'  }, process.env.secret)
        teacher.tokens = teacher.tokens.concat({ token : token })
        await teacher.save();

        const verificationLink = `http://localhost:5000/teacher/verify/${token}`
        await mail({ from: process.env.email, to: email, subject: 'Email verification', text: `Please click on the following link to verify your email: ${verificationLink}`})

        res.json({ msg: 'Teacher created successfully' })
    }
    catch(err){
        res.status(400).send(err.message);
    }

}

const login = async(req, res) => {

    const teacher = req.user;

    const token = jwt.sign({ email: teacher.email, role:'teacher'  }, process.env.secret)
    teacher.tokens = teacher.tokens.concat({ token : token })
    
    await teacher.save();
    res.cookie('token', token);

    res.json({token: token, teacher: teacher})

}

const emailVerification = (req, res) => {

    const token = req.params.token
    jwt.verify(token, process.env.secret, (err, decoded) => {
        if(err){
            res.status(400).json({msg: 'Invalid token'})
        }
        else{
            Teacher.findOne({email: decoded.email}).then((teacher) => {
                teacher.isVerified = true
                teacher.save()
                res.redirect(`http://localhost:5173/verify/student/${teacher.isVerified}`)
            })
        }
    })

}

const userPanel = async(req, res) => {

    try{
        const teacher = req.user;
        res.json(teacher)
    }
    catch(err){
        res.status(400).json(err.message);
    }

}

const getAllTeachers = async(req, res) => {
    try{
        const teachers = await Teacher.find()
        res.json(teachers)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const updateProfile = async(req, res) => {

    try{
        const { teacher } = req.body;
        console.log(teacher)
        const { id } = req.user;
        const updation = await Teacher.findByIdAndUpdate(id, teacher, {new: true})
        res.json(updation)
    }
    catch(err){
        res.status(400).json(err.message);
    }

}

const deleteProfile =  async(req, res) => {
    try{
        const {email} = req.body;
        const { id } = req.user;
        const deletion =  await Teacher.findByIdAndDelete(id)  
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const getTeacherCount = async(req, res) => {
   
    const count = await Teacher.countDocuments()
    return count;
   
}

const getProfile = async(req, res) => {
    try{
        const { username } = req.params;
        const teacher = await Teacher.findOne({username: username})
        res.json(teacher)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}

const searchTeacher = async(req, res) => {
    try{
        const teachers = await Teacher.find();
        const result = teachers.map((obj) => {
            return {
                name: obj.name,
                username: obj.username,
                profile: obj.profile,
                city: obj.city,
                rating: obj.rating,
                experience: obj.experience.experience,
                subjectType: obj.experience.subjectType,
                subjectLevel: obj.experience.subjectLevel,
                expertise: obj.experience.expertise,
                fee: obj.availability.fee,
            }
        })
        res.json(result)
    }
    catch(err){
        res.status(400).json(err.message);
    }
}



module.exports = {signUp, login, userPanel, emailVerification, updateProfile, getAllTeachers, deleteProfile, getTeacherCount, getProfile, searchTeacher}

