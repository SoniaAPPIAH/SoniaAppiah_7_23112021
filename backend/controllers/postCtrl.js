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
    //ENVOIE LA REQUETE AVEC MULTER ET LES VALEURS PAR DEFAUT
    db.query("INSERT INTO post SET ?", post, function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Post ajouté` });
    })
};


exports.readPost = async (req, res) => {

};

exports.updatePost = async (req, res) => {

};

exports.deletePost = async (req, res) => {

};