const Subscriber = require('../model/SubscriberModel');

// Get all subscribers
exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new subscriber
exports.addSubscriber = async (req, res) => {
    const { email } = req.body;

    try {
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
