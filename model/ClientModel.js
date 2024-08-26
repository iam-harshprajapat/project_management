const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL or path to the client's image
    designation: { type: String, required: true } // e.g., CEO, Web Developer, Designer
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;