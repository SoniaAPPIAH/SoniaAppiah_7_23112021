const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Cors
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;