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

exports.login = (req, res) => {
  //===== Check if user exists in DB ======
  const {email, password: clearPassword } = req.body;
  const sqlLogin = "SELECT * FROM Users WHERE email=?";
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

          // httpOnly: true,
          // maxAge,
          // sameSite: true,
          // secure: true,

          // remove the password key of the response
          delete results[0].password;

          res.cookie("jwt", token, { httpOnly: true, maxAge});
          res.status(200).json({
            user: results[0],
            token: jwt.sign({ email }, process.env.JWT_SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        } 
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
      } if (!results[0]) {
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

exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};

exports.deleteAccount = async (req, res) => {
  const userId = req.params.id;
  const sql = `DELETE FROM Users WHERE users.id = ${userId};`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.clearCookie("jwt");
    res.status(200).json("Votre compte a bien été désactivé");
  });
};