const Contact = require('../model/contactSchema');


const contactUs = async(req, res) => {
    
    const {name, email, message} = req.body;
    if(!name || !email || !message) return res.status(400).json({msg: 'Please enter all fields'})

    const newContact = new Contact({
        name,
        email,
        message
    })

    const savedContact = await newContact.save();
    res.json(savedContact);

}

const getAllContacts = async(req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
}

const getContactCount = async(req, res) => {
    const count = await Contact.countDocuments()
    return count;
}



module.exports = {contactUs, getAllContacts, getContactCount}

