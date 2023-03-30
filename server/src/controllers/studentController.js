const Student = require('./../model/studentSchema');
const mail = require('./../modules/mail');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const signUp = async(req, res) => {

    try{
        const {name, email, password, contactno, dob, username} = req.body;
        const student = new Student({name, email, password, contactno, dob, username})

        const token = jwt.sign({ email: email, role:'student'  }, process.env.secret , { expiresIn: "1h" })
        student.tokens = student.tokens.concat({ token : token })
        await student.save();

        const verificationLink = `http://localhost:3000/student/verify/${token}`
        await mail({ from: process.env.email, to: email, subject: 'Email verification', text: `Please click on the following link to verify your email: ${verificationLink}`})

        res.json({ msg: 'Student created successfully'})
    }
    catch(err){
        res.status(400).send(err.message);
    }

}

const login = async(req, res) => {

    const student = req.user;

    const token = jwt.sign({ email: student.email, role:'student' }, process.env.secret, { expiresIn: "1h" })
    student.tokens = student.tokens.concat({ token : token })
    
    await student.save();
    res.cookie('token', token);

    res.json(student);

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
                res.json({msg: 'Email verified successfully'})
            })
        }
    })

}

const userPanel = async(req, res) => {

    res.json(req.user)

}

module.exports = {signUp, login, userPanel, emailVerification}

