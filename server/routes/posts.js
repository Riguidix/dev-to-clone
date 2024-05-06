var express = require("express");
var router = express.Router();

const postController = require("../controllers/post");

router.post("/", postController.createPost);
router.get("/", postController.readPosts);
router.get("/:id", postController.readPostById);
router.put("/:id", postController.updatePost);
router.patch("/c/:id", postController.updatePostComment);
router.patch("/l/:id", postController.updatePostLikes);
router.delete("/:id", postController.deletePost);

module.exports = router;
