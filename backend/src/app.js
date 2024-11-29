const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const predictionRoutes = require('./routes/predictions');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/predictions', predictionRoutes);

module.exports = app;