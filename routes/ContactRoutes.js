const express = require('express');
const { getContacts, addContact } = require('../controllers/ContactController');

const router = express.Router();

router.get('/contacts', getContacts);
router.post('/contacts', addContact);

module.exports = router;
