const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post("/register", (req, res) => {
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;
    db.query(
        "INSERT INTO Users (firstname, lastname, email, password) VALUES (?, ?, ?, ?);",
        [lastname, firstname, email, password],
        (err, results) => {
            console.log(err);
            res.send(results);
        }
    );
});

module.exports = router;