const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');

router.post("/create", UserController.user_create);
router.post("/verify", UserController.user_verifcation);
router.post("/login", UserController.user_login);
router.post("/forgetPassword", UserController.forget_password);
router.post("/resetPassword", UserController.reset_password);

module.exports = router;
