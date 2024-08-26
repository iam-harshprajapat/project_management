const Project = require('../model/ProjectModel');
// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).send({
            success: true,
            projects
        });
    } catch (error) {
        console.error('Error in getProjects:', error);
        res.status(500).send({
            success: false,
            message: "Unable to fetch projects !!",
            error
        });
    }
};

// Add a new project
exports.addProject = async (req, res) => {
    const { name, description } = req.body;
    const file = req.file;

    if (!name || !description || !file) {
        return res.status(400).send({
            success: false,
            message: "All fields are required, including the image file."
        });
    }

    try {
        const newProject = new Project({
            name,
            description,
            image: file.path // Save image path to the database
        });
        await newProject.save();
        return res.status(201).send({
            success: true,
            message: "Project added successfully !!",
            newProject
        });
    } catch (error) {
        console.error('Error in addProject:', error);
        res.status(500).send({
            success: false,
            message: "Unable to add Project !!",
            error
        });
    }
};
