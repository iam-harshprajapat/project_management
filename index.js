const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const morgan = require('morgan');
const path = require('path');

const projectRoutes = require('./routes/ProjectRoutes');
const clientRoutes = require('./routes/ClientRoutes');
const contactRoutes = require('./routes/ContactRoutes');
const subscriberRoutes = require('./routes/SubscriberRoutes');

const app = express();
dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', projectRoutes);
app.use('/api', clientRoutes);
app.use('/api', contactRoutes);
app.use('/api', subscriberRoutes);
// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Node Server Running in ${process.env.DEV_MODE} Mode on port ${process.env.PORT}...`.bgBlue.black);
});