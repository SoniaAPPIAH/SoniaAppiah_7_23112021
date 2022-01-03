const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');

router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

router.patch('/like-post/:id', postCtrl.likeUnlikePost);

router.patch('/comment-post/:id', postCtrl.createComment);
router.get('/all-comments-post/:id', postCtrl.getAllComments);
router.delete('/delete-comment-post/:id', postCtrl.deleteComment);

module.exports = router;