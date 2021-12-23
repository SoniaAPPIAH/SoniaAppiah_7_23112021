const express = require('express');
const userRoutes = require('./routes/user');
const app = express();

app.use('api/user', userRoutes);


module.exports = app;