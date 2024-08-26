const Contact = require('../model/ContactModel');

// Get all contact form submissions
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        return res.status(200).send({
            success: true,
            message: "Contacts fetched successfully!",
            contacts
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Unable to fetch contacts!",
            err
        });
    }
};

// Add a new contact form submission
exports.addContact = async (req, res) => {
    const { fullName, email, mobileNumber, city } = req.body;

    try {
        const newContact = new Contact({ fullName, email, mobileNumber, city });
        await newContact.save();
        return res.status(201).send({
            success: true,
            message: "Contact Added Successfully !!",
            newContact
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error in Adding Contact !!",
            err
        });
    }
};
