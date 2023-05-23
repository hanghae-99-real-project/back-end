const express = require("express");

const router = express.Router();
const uploadImage = require("../modules/s3.js");
const authMiddleware = require("../middlewares/auth-middleware");
const UserController = require("../(1)controllers/users.controller");
const userController = new UserController();


router.post(
    "/signup",
    uploadImage.single("image"),
    userController.signup);

// 닉네임 중복 확인 API
router.post(
    "/checkNickname",
    userController.checkNickname);


router.post(
    "/login",
    userController.login);


router.delete(
    "/logout",
    userController.logout);

module.exports = router;
