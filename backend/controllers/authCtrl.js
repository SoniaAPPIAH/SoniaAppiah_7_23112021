const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../config/db");

exports.register = async (req, res) => {
  try {
    const oldPassword = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(oldPassword, salt);

    const user = {
      ...req.body,
      password: encryptedPassword,
    };

    db.query("INSERT INTO users SET ?", user, (err, result) => {
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
  const { email, password: clearPassword } = req.body;
  db.query("SELECT * FROM Users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }

    // ===== Verify password with hash in DB ======
    if (results[0] && results[0].active === 1) {
      try {
        const { password: hashedPassword, id } = results[0];
        const match = await bcrypt.compare(clearPassword, hashedPassword);
        if (match) {
          // If match, generate JWT token
          const token = jwt.sign({ id }, process.env.JWT_DECODEDTOKEN, {
            expiresIn: '24h',
          });

          delete results[0].user_password;

          res.cookie("jwt", token);
          res.status(200).json({
            user: results[0],
            token: jwt.sign({ userId: user_id }, process.env.JWT_DECODEDTOKEN, {
              expiresIn: "24h",
            }),
          });
        } 
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
    } else if (results[0] && results[0].active === 0) {
      res.status(200).json({
        error: true,
        message: "Votre compte a été désactivé",
      });
    } else if (!results[0]) {
      res.status(200).json({
        error: true,
        message: "Mauvaise combinaison email / mot de passe"
      })
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};

exports.deleteAccount = (req, res) => {
  const userId = req.params.id;
  const sql = `DELETE FROM Users WHERE users.id = ${userId};`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.clearCookie("jwt");
    res.status(200).json("DESACTIVATE");
  });
};