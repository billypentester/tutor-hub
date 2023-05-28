const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
require('dotenv').config()
const session = require('express-session')
var morgan = require('morgan')
const path = require('path')
const cors = require('cors');
const setupSocket = require('./src/modules/chat')

const passport = require('./src/middleware/googleAuth')
const student = require('./src/api/student')
const teacher = require('./src/api/teacher')
const admin = require('./src/api/admin')
const contact = require('./src/api/general')

const port = process.env.PORT || 5000

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
// static files path

app.use(cors());
app.use(morgan('tiny'))

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session());
app.use('/public', express.static(path.join(__dirname, '/src/public/uploads')))

app.use(student)
app.use(teacher)
app.use(admin)
app.use(contact)


server.listen(port, () => {
  console.log(`Node App listening: http://localhost:${port}`)
})

setupSocket(server);