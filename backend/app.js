const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

// Cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

app.use(cors(corsOptions));

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;