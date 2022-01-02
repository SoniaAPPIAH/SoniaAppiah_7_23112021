const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');

router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.createPost);
router.put('/:d', postCtrl.updatePost);
router.delete('/:d', postCtrl.deletePost);

module.exports = router;