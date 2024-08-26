const express = require('express');
const { getSubscribers, addSubscriber } = require('../controllers/SubscriberController');

const router = express.Router();

router.get('/subscribers', getSubscribers);
router.post('/subscribers', addSubscriber);

module.exports = router;
