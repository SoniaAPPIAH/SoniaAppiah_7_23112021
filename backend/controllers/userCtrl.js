const db = require('../config/db');
const fs = require("fs");
require('dotenv').config();

exports.getOneUser = async (req, res) => {
    const { id: userId } = req.params;
    const dbGetUser = `SELECT * FROM Users WHERE users.userId = ${userId};`;
    db.query(dbGetUser, (err, result) => {
        if (err) {
        res.status(404).json({ err });
        throw err;
        }
        delete result[0].password;
        res.status(200).json(result);
    });
};

exports.updateUser = (req, res, next) => {
    const { id: userId } = req.params;
    const dbUpdateUser = `SELECT * FROM Users WHERE users.userId = ${userId};`;
    db.query(dbUpdateUser, (err, result) => {
        if (err) res.status(400).json({ err });
        if (!result[0]) res.status(400).json({ message: "Aucun id ne correspond dans la table" });
        else {
            // SI LE USER A UNE IMAGE, LA SUPPRIMER DU DOSSIER IMAGES/PROFILE
            if (result[0].profilpicture != "http://localhost:3001/images/profil/pp.png") {
                const name = result[0].profilpicture?result[0].profilpicture.split('/images/profil/'): [];
                fs.unlink(`images/profil/${name}`, () => {
                    if (err) console.log(err);
                    else console.log('Image modifiée !');
                })
            }
            // RECUPERE LES INFOS ENVOYER PAR LE FRONT 
            let image = (req.file) ? `${req.protocol}://${req.get('host')}/images/profil/${req.file.filename}` : "";
            // UPDATE LA DB
            db.query("UPDATE Users SET profilpicture = ? WHERE users.userId = ?", [image, req.params.id], function (err, result) {
                if (err) throw err;
                res.status(201).json({ message: `Photo user udpate` });
            });
        }
    });
}