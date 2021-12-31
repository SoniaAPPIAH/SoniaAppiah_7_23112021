const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const oldPassword = req.body.password;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(oldPassword, salt)

    const user ={
      ...req.body,
      password: hash,
    }

    db.query( "INSERT INTO Users SET ?", user, (err, result) => {
      if (!result) {
        res.json({ message: "L'email existe déjà !" });
      } else {
        res.json({ message: "L'utilisateur a bien été crée !" });
      }
    });
  } catch (err) {
    res.json({ message: "Echec de l'inscription", err });
  }
};

exports.login = (req, res) => {
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
              res.json({ loggedIn: false, message: "Mot de passe incorrect !" });
            }
          } else {
            res.json({ loggedIn: false, message: "L'utilisateur n'existe pas !" });
          }
        }
    );
};
