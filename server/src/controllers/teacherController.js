const Teacher = require('../model/teacherSchema')
const jwt = require("jsonwebtoken");
require('dotenv').config();
const mail = require('./../modules/mail');


const signUp = async(req, res) => {

    try{
        const {name, email, username, password} = req.body;
        const teacher = new Teacher({name, email, username, password})

        const token = jwt.sign({ email: email, role:'teacher'  }, process.env.secret , { expiresIn: "1h" })
        teacher.tokens = teacher.tokens.concat({ token : token })
        await teacher.save();

        const verificationLink = `http://localhost:3000/teacher/verify/${token}`
        await mail({ from: process.env.email, to: email, subject: 'Email verification', text: `Please click on the following link to verify your email: ${verificationLink}`})

        res.json({ msg: 'Teacher created successfully' })
    }
    catch(err){
        res.status(400).send(err.message);
    }

}

const login = async(req, res) => {

    const teacher = req.user;

    const token = jwt.sign({ email: teacher.email, role:'teacher'  }, process.env.secret , { expiresIn: "1h" })
    teacher.tokens = teacher.tokens.concat({ token : token })
    
    await teacher.save();
    res.cookie('token', token);

    res.json(teacher);

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
                res.json({msg: 'Email verified successfully'})
            })
        }
    })

}

const userPanel = async(req, res) => {

    res.redirect(`http://localhost:5173/teacher/dashboard/${req.user._id}`)

}

const getUser = async(req, res) => {

    try{
        console.log(req.params.id)
        const teacher = await Teacher.findById(req.params.id)
        res.json(teacher)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err.message);
    }

}



module.exports = {signUp, login, userPanel, emailVerification, getUser}

