const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
