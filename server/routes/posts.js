var express = require('express');
var router = express.Router();

const postController = require('../controllers/post');

router.post('/', postController.createPost);

module.exports = router;
