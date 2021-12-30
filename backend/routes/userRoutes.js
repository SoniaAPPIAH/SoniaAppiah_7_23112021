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

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(
        "SELECT * FROM Users WHERE email = ?",
        email,
        (err, results) => {
          if (err) {
            console.log(err);
          }
          if (results.length > 0) {
            if (password == results[0].password) {
              res.json({ loggedIn: true, email: email });
            } else {
              res.json({ loggedIn: false, message: "Email/Mot de passe incorrect !" });
            }
          } else {
            res.json({ loggedIn: false, message: "L'utilisateur n'existe pas !" });
          }
        }
      );
    });


module.exports = router;