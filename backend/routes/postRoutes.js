const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');

router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

router.post('/:postId')

module.exports = router;