const Client = require('../model/ClientModel');

// Get all clients
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        return res.status(200).send({
            success: true,
            clients
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Unable to get Client !!",
            error
        });
    }
};

// Add a new client
exports.addClient = async (req, res) => {
    const { name, description, designation } = req.body;

    try {
        const newClient = new Client({
            name,
            description,
            designation,
            image: req.file.path // Save image path to the database
        });
        await newClient.save();
        return res.status(201).send({
            success: true,
            message: "Client added successfully !!",
            newClient
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Unable to add Client !!",
            error
        });
    }
};
