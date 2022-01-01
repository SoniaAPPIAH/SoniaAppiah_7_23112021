const db = require('../config/db');
require('dotenv').config();

exports.getOneUser = async (req, res) => {
    const { id: userId } = req.params;
    const dbGetUser = `SELECT * FROM Users WHERE users.id = ${userId};`;
    db.query(dbGetUser, (err, result) => {
        if (err) {
        res.status(404).json({ err });
        throw err;
        }
        delete result[0].password;
        res.status(200).json(result);
    });
};

exports.updateOneUser = (req, res, next) => {
    if (req.file) {
      const {id: id} = req.params
      let {destination, filename} = req.file
      destination = destination + filename
  
      const dbInsertImage = `INSERT INTO images (post_id, user_id, image_url) VALUES (NULL, ${id}, "${destination}");`;
      db.query(dbInsertImage, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
      });
    }
  };