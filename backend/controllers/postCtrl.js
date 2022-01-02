const db = require("../config/db");
const fs = require("fs");

exports.createPost = async (req, res) => {
    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}` : "";
    const messagePost = (req.body.message) ? req.body.message : " ";
    
    const post = {
        ...req.body,
        message: messagePost,
        imageUrl: image,
        like: 0,
        datetime: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
    };

    db.query("INSERT INTO Posts SET ?", post, function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Post ajouté` });
    })
};

exports.getAllPosts = async (req, res) => {
    db.query("SELECT * FROM posts p JOIN Users WHERE userId=authorId ORDER BY datetime DESC LIMIT 50;", function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
};

exports.updatePost = async (req, res) => {
    if (req.file) {
        // SI LE POST A UNE IMAGE, LA SUPPRIMER DU DOSSIER IMAGES
        if (result[0].imageURL != "") {
            const name = result[0].imageURL.split('/images/post/')[1];
            fs.unlink(`images/${name}`, () => {
                if (err) console.log(err);
                else console.log('Image modifiée !');
            })
        }
        // RECUPERE LES INFOS ENVOYER PAR LE FRONT 
        let image = (req.file) ? `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}` : "";
        const post = {
            ...req.body,
            imageURL: image,
        };
        // UPDATE LA DB
        let sql2 = `UPDATE Posts SET ?`;
        db.query(sql2, [post, req.params.id], function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: `Post udpate` });
        });     
    } else {
        // RECUPERE LES INFOS ENVOYER PAR LE FRONT 
        const post = {
        ...req.body
        };
        // UPDATE LA DB
        let sql2 = `UPDATE Posts SET ?`;
                db.query(sql2, [post, req.params.id], function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: `Post update` });
        });
    }
};

exports.deletePost = async (req, res) => {
    const { id: postId } = req.params;
    const sqlDelete = `DELETE FROM Posts WHERE posts.postId = ${postId};`;
    db.query(sqlDelete, (err, results) => {
      if (err) {
        return res.status(404).json({ err });
      }
      res.status(200).json("Post supprimé");
    })
};

exports.likeUnlikePost = (req, res) => {
    const { userId, postId } = req.body;
    const sqlSelect = `SELECT * FROM likes WHERE likes.userId = ${userId} AND likes.postId = ${postId}`;
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).json({ err });
        throw err;
      }
  
      if (result.length === 0) {
        const sqlInsert = `INSERT INTO likes (userId, postId) VALUES (${userId}, ${postId})`;
        db.query(sqlInsert, (err, result) => {
          if (err) {
            console.log(err);
            res.status(404).json({ err });
            throw err;
          }
          res.status(200).json(result);
        });
      } else {
        const sqlUnlike = `DELETE FROM likes WHERE likes.userId = ${userId} AND likes.postId = ${postId}`;
        db.query(sqlUnlike, (err, result) => {
          if (err) {
            console.log(err);
            res.status(404).json(err);
            throw err;
          }
          res.status(200).json(result);
        });
      }
    });
  };