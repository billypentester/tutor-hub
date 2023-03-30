const Teacher = require('./../model/teacherSchema');
const Student = require('./../model/studentSchema');
const bycrypt = require('bcryptjs');

const Register = async(req, res, next) => {
    const alreadyExist = req.body.role === 'student' ? await Student.findOne({email: req.body.email}) : await Teacher.findOne({email: req.body.email});
    if(alreadyExist) return res.status(400).json({message: `${req.body.role} User already exist`});
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.username || !req.body.contactno) return res.status(400).json({message: 'Please fill all the fields'});
    next();
}

const Login = async(req, res, next) => {
    if(!req.body.email || !req.body.password || !req.body.role) return res.status(400).json({message: 'Please fill all the fields'});
    const find = req.body.role === 'student' ? await Student.findOne({email: req.body.email}) : await Teacher.findOne({email: req.body.email})
    if(!find) return res.status(400).json({message: `${req.body.role} does not exist`});
    const decrypt = bycrypt.compareSync(req.body.password, find.password);
    if(!decrypt) return res.status(400).json({message: 'Invalid Password'});
    req.user = find;
    next();
}


module.exports = {Register, Login};