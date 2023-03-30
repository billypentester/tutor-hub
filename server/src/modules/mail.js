const mail = require('nodemailer')
require('dotenv').config();

const transporter = mail.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.email,
        pass:process.env.epass
    },
})

const sendMail = async (from, to, subject, text) => {
    const result = await transporter.sendMail(from, to, subject, text)
    return result
}

module.exports = sendMail
