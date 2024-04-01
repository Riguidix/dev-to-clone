var express = require('express');
var router = express.Router();

const postController = require('../controllers/post');

router.post('/', postController.createPost);
router.get('/', postController.readPosts);
router.get('/:id', postController.readPostById);
router.put('/:id', postController.updatePost);

module.exports = router;
