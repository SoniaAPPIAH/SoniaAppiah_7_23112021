const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// Routes 
app.use('/auth', authRoutes);


module.exports = app;