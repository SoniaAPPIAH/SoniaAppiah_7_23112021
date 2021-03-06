const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../config/db");

exports.register = async (req, res) => {
  try {
    const oldPassword = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(oldPassword, salt);
    const imageDefaut = ('/images/profil/photo_defaut.png');

    const user = {
      ...req.body,
      password: encryptedPassword,
      profilpicture: imageDefaut
    };

    db.query("INSERT INTO Users SET ?", user, (err, result) => {
      if (!result) {
        res.status(200).json({ message: "Email déjà enregistré !" });
      } else {
        res.status(201).json({ message: "L'utilisateur a bien été crée !" });
      }
    });
  } catch (err) {
    res.status(200).json({ message: "Echec d'incription", err });
  }
};

exports.login = async (req, res) => {
  //===== Check if user exists in DB ======
  const {email, password: clearPassword } = req.body;
  const sqlLogin = `SELECT * FROM Users WHERE email=?`;
  db.query(sqlLogin, [email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }

    // ===== Verify password with hash in DB ======
      try {
        const { password: hashedPassword, email } = results[0];
        const match = await bcrypt.compare(clearPassword, hashedPassword);
        if (match) {
          // If match, generate JWT token
          const maxAge = 1 * (24 * 60 * 60 * 1000);
          const token = jwt.sign({ email }, process.env.JWT_SECRET_TOKEN, {
            expiresIn: maxAge,
          });

          res.cookie("jwt", token, { httpOnly: true, maxAge});
          res.status(200).json({
            user: results[0],
            token: jwt.sign({ email }, process.env.JWT_SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        } 
      } catch (err) {
        return res.status(400).json( "test" );
      } if (!results[0]) {
      res.status(200).json({
        error: true,
        message: "Mauvaise combinaison email / mot de passe"
      })
    }
  });
};

exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("Utilisateur déconnecté");
};

exports.deleteAccount = async (req, res) => {
  const userId = req.params.id;
  const sqlDelete = `DELETE FROM Users WHERE users.userId = ${userId};`;
  db.query(sqlDelete, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.clearCookie("jwt");
    res.status(200).json("Votre compte a bien été désactivé");
  });
};