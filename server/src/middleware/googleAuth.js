const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require('./../model/studentSchema')
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signUp = {
    clientID: '105385184117-ht1e2jr8p5j31nj53bdiubgg3s68t0o9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/signup/callback',
}

const login = {
    clientID: '105385184117-ht1e2jr8p5j31nj53bdiubgg3s68t0o9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/login/callback'
}

passport.use('google-signup', new GoogleStrategy(signUp, async(accessToken, refreshToken, profile, done) => {
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

passport.use('google-login', new GoogleStrategy(login, async(accessToken, refreshToken, profile, done) => {
    const find = await Student.findOne({email: profile.emails[0].value})
    if(!find) return done(null, {message: 'User does not exists'})
    const token = jwt.sign({ email: profile.emails[0].value, role:'student' }, process.env.secret, { expiresIn: "1h" })
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