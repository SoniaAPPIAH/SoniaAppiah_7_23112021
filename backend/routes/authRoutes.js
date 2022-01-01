const express = require('express');
const router = express.Router();
const authCtrl= require('../controllers/authCtrl');
const password = require('../middleware/password');
const regexEmail = require('../middleware/email')

router.post("/register", regexEmail, password, authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.delete("/deleteaccount/:id", authCtrl.deleteAccount);

module.exports = router;





