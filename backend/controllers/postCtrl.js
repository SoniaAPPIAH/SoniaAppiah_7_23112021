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

    db.query("INSERT INTO post SET ?", post, function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Post ajouté` });
    })
};

exports.getAllPosts = async (req, res) => {
    db.query("SELECT * FROM post p JOIN Users WHERE id=authorId ORDER BY datetime DESC LIMIT 50;", function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
};

exports.updatePost = async (req, res) => {

};

exports.deletePost = async (req, res) => {

};