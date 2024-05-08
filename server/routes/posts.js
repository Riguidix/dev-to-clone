var express = require("express");
var router = express.Router();

const tokenValidator = require("../utils/tokenValidator");
const postController = require("../controllers/post");

router.post("/", tokenValidator, postController.createPost);
router.get("/", postController.readPosts);
router.get("/:id", postController.readPostById);
router.put("/:id", tokenValidator, postController.updatePost);
router.patch("/c/:id", tokenValidator, postController.updatePostComment);
router.patch("/l/:id", tokenValidator, postController.updatePostLikes);
router.delete("/:id", tokenValidator, postController.deletePost);

module.exports = router;
