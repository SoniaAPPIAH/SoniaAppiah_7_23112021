const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');

router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

router.patch('/likepost/:id', postCtrl.likeUnlikePost);

router.patch('/comment/:id', postCtrl.createComment);
router.get('/allcomments/:id', postCtrl.getAllComments);
router.delete('/deletecomment/:id', postCtrl.deleteComment);

module.exports = router;