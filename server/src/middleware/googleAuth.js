const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require('./../model/studentSchema')
const Teacher = require('./../model/teacherSchema')
const jwt = require("jsonwebtoken");
require('dotenv').config();

const studentSignUp = {
    clientID: '105385184117-ht1e2jr8p5j31nj53bdiubgg3s68t0o9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/student/signup/callback',
}

const studentLogin = {
    clientID: '105385184117-ht1e2jr8p5j31nj53bdiubgg3s68t0o9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/student/login/callback'
}

const teacherSignUp = {
    clientID: '105385184117-ht1e2jr8p5j31nj53bdiubgg3s68t0o9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/teacher/signup/callback',
}

const teacherLogin = {
    clientID: '105385184117-ht1e2jr8p5j31nj53bdiubgg3s68t0o9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/teacher/login/callback'
}

passport.use('student-signup', new GoogleStrategy(studentSignUp, async(accessToken, refreshToken, profile, done) => {
    const find = await Student.findOne({email: profile.emails[0].value})
    if(find) return done(null, {message: 'User already exists'})
    const user = new Student({
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.id,
        password: profile.id,
        isVerified: profile.emails[0].verified,
        role:'student'
    })
    const token = jwt.sign({ email: profile.emails[0].value, role:'student' }, process.env.secret, { expiresIn: "1h" })
    user.tokens = user.tokens.concat({ token : token })
    await user.save();
    done(null, user)
}));

passport.use('student-login', new GoogleStrategy(studentLogin, async(accessToken, refreshToken, profile, done) => {
    const find = await Student.findOne({email: profile.emails[0].value})
    if(!find) return done(null, {message: 'User does not exists'})
    const token = jwt.sign({ email: profile.emails[0].value, role:'student' }, process.env.secret, { expiresIn: "1h" })
    find.tokens = find.tokens.concat({ token : token })
    await find.save();
    done(null, find)
}));

passport.use('teacher-signup', new GoogleStrategy(teacherSignUp, async(accessToken, refreshToken, profile, done) => {
    const find = await Teacher.findOne({email: profile.emails[0].value})
    if(find) return done(null, {message: 'User already exists'})
    const user = new Teacher({
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.id,
        password: profile.id,
        isVerified: profile.emails[0].verified,
        role:'teacher'
    })
    const token = jwt.sign({ email: profile.emails[0].value, role:'teacher' }, process.env.secret, { expiresIn: "1h" })
    user.tokens = user.tokens.concat({ token : token })
    await user.save();
    done(null, user)
}));

passport.use('teacher-login', new GoogleStrategy(teacherLogin, async(accessToken, refreshToken, profile, done) => {
    const find = await Teacher.findOne({email: profile.emails[0].value})
    if(!find) return done(null, {message: 'User does not exists'})
    const token = jwt.sign({ email: profile.emails[0].value, role:'teacher' }, process.env.secret, { expiresIn: "1h" })
    find.tokens = find.tokens.concat({ token : token })
    await find.save();
    done(null, find)
}));


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

module.exports = passport;