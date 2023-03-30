const express = require('express')
const app = express()
require('dotenv').config()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./src/middleware/googleAuth')

const student = require('./src/api/student')
const teacher = require('./src/api/teacher')
const admin = require('./src/api/admin')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.session());
app.use(passport.initialize())



app.use(student)
app.use(teacher)
app.use(admin)







app.listen(port, () => {
    console.log(`Node App listening: http://localhost:${port}`)
})