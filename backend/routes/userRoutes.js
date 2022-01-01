const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const multer = require('../middleware/multer-config')

router.get('/:id', userCtrl.getOneUser);
router.put('/:id', multer, userCtrl.updateUser);

module.exports = router;