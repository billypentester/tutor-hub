const express = require('express')
const router = express.Router()

const {contactUs, getAllContacts} = require('../controllers/contactController')

router.post('/api/contactus', contactUs)
router.get('/contact/all', getAllContacts)


module.exports = router;