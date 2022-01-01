const jwt = require('jsonwebtoken');
const db = require('../config/db')
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const { jwt: token } = req.cookies;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      const { id: userId } = decodedToken;
      const sql = `SELECT id FROM Users WHERE id = ${userId}`;
      db.query(sql, (err, result) => {
        if (err) res.status(204).json(err);
        else {
          next();
        }
      });
    } else {
      res.clearCookie();
      res.status(401).json({ message: "Unauthorized"});
    }
  } catch (err) {
    res.clearCookie();
    res.status(401).json({ message: "Unauthorized 2" });
  }
};