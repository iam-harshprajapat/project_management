const express = require('express');
const { getClients, addClient } = require('../controllers/ClientController');
const { upload } = require('../middlewares/uploadMiddleware'); // Import the upload middleware

const router = express.Router();

router.get('/clients', getClients);
router.post('/clients', upload.single('image'), addClient); // Use the upload middleware

module.exports = router;
