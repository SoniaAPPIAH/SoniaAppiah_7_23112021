const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    //const image = `${req.protocol}://${req.get('localhost')}/images/profilpicture/photo_defaut.png`;
    const user = {
      ...req.body,
      password: hash,
    // imageURL: image,
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
  db.query("SELECT * FROM Users WHERE email = ?", [req.body.email], function (err, result) {
      const user = result[0];

      if (!user) return res.json({ message: "Email incorrect !" });

      bcrypt.compare(req.body.password, user.password)
          .then(valid => {
              if (!valid) {
                  return res.json({ message: "Mot de passe incorrect !" })
              }
              res.status(200).json({
                  userId: user.id,
                  token: jwt.sign(
                      { userId: user.id },
                      process.env.SECRET_TOKEN_KEY,
                      { expiresIn: "24h" },
                  ),
              })
          })
          .catch(err => res.status(500).json({ message: "Erreur d'authentification" }));
  })
};