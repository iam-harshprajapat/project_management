const express = require('express');
const { getProjects, addProject } = require('../controllers/ProjectController');
const { upload } = require('../middlewares/uploadMiddleware'); // Import the upload middleware
const router = express.Router();

router.get('/projects', getProjects);
router.post('/projects', upload.single('image'), addProject); // Upload single image

module.exports = router;
