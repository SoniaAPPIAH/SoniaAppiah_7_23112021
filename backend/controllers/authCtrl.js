const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    const user = {
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

exports.login = (req, res, next) => {
  db.query("SELECT * FROM Users WHERE email = ?", [req.body.email], function (err, result) {
      const user = result[0];

      if (!user) return res.status(401).json({ error: "Email incorrect" });

      bcrypt.compare(req.body.password, user.password)
          .then(valid => {
              if (!valid) {
                  return res.status(401).json({ error: " Mot de passe incorrect !" })
              }
              console.log("utilisateur connecté");
              res.status(200).json({
                  userId: user.id,
                  token: jwt.sign(
                      { userId: user.id },
                      process.env.SECRET_TOKEN_KEY,
                      { expiresIn: "24h" },
                  ),
              })
          })
          .catch(error => res.status(500).json({ message: "Erreur authentification" }));
  })
};

exports.logout = (req, res) => {

};

exports.deleteAccount = (req, res) => {

};