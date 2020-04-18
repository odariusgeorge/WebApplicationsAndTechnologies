const express = require('express');
const router  = express.Router();
const UserController = require("../controllers/user");

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.post("/createModerator", UserController.createModerator);

module.exports = router;
