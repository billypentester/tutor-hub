const jwt = require('jsonwebtoken');
const Teacher = require('../model/teacherSchema');
const Student = require('../model/studentSchema');
require('dotenv').config();

const auth = async (req, res, next) => {

    try {
        const token = req.body.token;
        if (!token) throw new Error();
        const verifyUser = jwt.verify(token, process.env.secret);

        switch (verifyUser.role) 
        {
            case 'student':
                const student =  await Student.findOne({ email: verifyUser.email })
                if (!student) {
                    throw new Error()
                }
                req.token = token;
                req.user = student;
                next();
                break;
            case 'teacher':
                const teacher =  await Teacher.findOne({ email: verifyUser.email })
                if (!teacher) {
                    throw new Error()
                }
                req.token = token;
                req.user = teacher;
                next();
                break;
            case 'admin':
                req.token = token;
                req.user = verifyUser;
                next();
                break;
            default:
                throw new Error()
        }

    } 
    catch (error) {
        res.status(401).json({ error: `Please authenticate: ${error}` })
    }
}

module.exports = auth;