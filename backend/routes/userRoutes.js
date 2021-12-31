const express = require('express');
const router = express.Router();
const userCtrl= require('../controllers/userCtrl');



router.get("/logout", userCtrl.logout);
router.get("/deleteAccount/:id", userCtrl.deleteAccount);

module.exports = router;