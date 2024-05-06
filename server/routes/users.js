const express = require("express");
let router = express.Router();

const tokenValidator = require("../utils/tokenValidator");
const userController = require("../controllers/user");

router.post("/login", userController.login);
router.post("/", tokenValidator, userController.createUser);
router.get("/", tokenValidator, userController.readUsers);
router.get("/:id", tokenValidator, userController.readUserById);
router.put("/:id", tokenValidator, userController.updateUser);
router.patch("/p/:id", tokenValidator, userController.updateUserPass);
router.patch("/follow/", tokenValidator, userController.updateFollowing);
router.patch("/unfollow/", tokenValidator, userController.updateUnfollow);
router.delete("/:id", tokenValidator, userController.deleteUser);

module.exports = router;
