const Student = require('./../model/studentSchema');
const mail = require('./../modules/mail');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const signUp = async(req, res) => {

    try{
        const {name, email, password, username} = req.body;
        const student = new Student({name, email, password, username})

        const token = jwt.sign({ email: email, role:'student'  }, process.env.secret , { expiresIn: "1h" })
        student.tokens = student.tokens.concat({ token : token })
        res.cookie('token', token);
        await student.save();

        const verificationLink = `http://localhost:3000/student/verify/${token}`
        await mail({ from: process.env.email, to: email, subject: 'Email verification', text: `Please click on the following link to verify your email: ${verificationLink}`})

        res.status(200).json({ msg: 'Student created successfully'})
    }
    catch(err){
        res.status(400).json(err.message);
    }

}

const login = async(req, res) => {

    const student = req.user;

    const token = jwt.sign({ email: student.email, role:'student' }, process.env.secret, { expiresIn: "1h" })
    student.tokens = student.tokens.concat({ token : token })
    
    await student.save();
   
    res.json({token: token, student: student})

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
                res.redirect(`http://localhost:5173/signup/student/verify/${student.isVerified}`)
            })
        }
    })

}

const userPanel = async(req, res) => {

    const user = req.user;
    console.log(user)
    res.send(`Hello,!`);

}

const getUser = async(req, res) => {

    try{
        console.log(req.params.id)
        const student = await Student.findById(req.params.id)
        res.json(student)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err.message);
    }

}


module.exports = {signUp, login,  emailVerification, userPanel, getUser}

