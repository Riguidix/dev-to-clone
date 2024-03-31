var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);
router.get('/', userController.readUsers);
router.get('/:id', userController.readUserById);

module.exports = router;
