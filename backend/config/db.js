const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit : 100,
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "groupomania",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

module.exports = connection;