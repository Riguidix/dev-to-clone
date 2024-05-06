var express = require("express");
var router = express.Router();

const userController = require("../controllers/user");

router.post("/login", userController.login);
router.post("/", userController.createUser);
router.get("/", userController.readUsers);
router.get("/:id", userController.readUserById);
router.put("/:id", userController.updateUser);
router.patch("/p/:id", userController.updateUserPass);
router.patch("/follow/", userController.updateFollowing);
router.patch("/unfollow/", userController.updateUnfollow);
router.delete("/:id", userController.deleteUser);

module.exports = router;
