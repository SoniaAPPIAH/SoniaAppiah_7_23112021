const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sampleDB',
});

connection.connect(function(error) {
    if(!error) {
        console.log('Error');
    } else {
        console.log('Connected');
    }
});

app.listen