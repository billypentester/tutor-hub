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

function generateUsername(email) {
    const emailPrefix = email.split('@')[0];
    const alphanumericPrefix = emailPrefix.replace(/[^a-zA-Z0-9]/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const username = alphanumericPrefix + randomSuffix;
    return username;
}

passport.use('student-signup', new GoogleStrategy(studentSignUp, async(accessToken, refreshToken, profile, done) => {
    const find = await Student.findOne({email: profile.emails[0].value})
    if(find) return done(null, find)
    const user = new Student({
        name: profile.displayName,
        email: profile.emails[0].value,
        username: generateUsername(profile.emails[0].value),
        password: profile.id,
        isVerified: profile.emails[0].verified,
        role:'student'
    })
    const token = jwt.sign({ email: profile.emails[0].value, role:'student' }, process.env.secret)
    user.tokens = user.tokens.concat({ token : token })
    await user.save();
    done(null, user)
}));

passport.use('student-login', new GoogleStrategy(studentLogin, async(accessToken, refreshToken, profile, done) => {
    const find = await Student.findOne({email: profile.emails[0].value})
    if(find) return done(null, find)
    const user = new Student({
        name: profile.displayName,
        email: profile.emails[0].value,
        username: generateUsername(profile.emails[0].value),
        password: profile.id,
        isVerified: profile.emails[0].verified,
        role:'student'
    })
    const token = jwt.sign({ email: profile.emails[0].value, role:'student' }, process.env.secret)
    user.tokens = user.tokens.concat({ token : token })
    await user.save();
    done(null, user)
}));

passport.use('teacher-signup', new GoogleStrategy(teacherSignUp, async(accessToken, refreshToken, profile, done) => {
    const find = await Teacher.findOne({email: profile.emails[0].value})
    if(find) return done(null, find)
    const user = new Teacher({
        name: profile.displayName,
        email: profile.emails[0].value,
        username: generateUsername(profile.emails[0].value),
        password: profile.id,
        isVerified: profile.emails[0].verified,
        role:'teacher'
    })
    const token = jwt.sign({ email: profile.emails[0].value, role:'teacher' }, process.env.secret)
    user.tokens = user.tokens.concat({ token : token })
    await user.save();
    done(null, user)
}));

passport.use('teacher-login', new GoogleStrategy(teacherLogin, async(accessToken, refreshToken, profile, done) => {
    const find = await Teacher.findOne({email: profile.emails[0].value})
    if(find) return done(null, find)
    const user = new Teacher({
        name: profile.displayName,
        email: profile.emails[0].value,
        username: generateUsername(profile.emails[0].value),
        password: profile.id,
        isVerified: profile.emails[0].verified,
        role:'teacher'
    })
    const token = jwt.sign({ email: profile.emails[0].value, role:'teacher' }, process.env.secret)
    user.tokens = user.tokens.concat({ token : token })
    await user.save();
    done(null, user)
}));


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

module.exports = passport;