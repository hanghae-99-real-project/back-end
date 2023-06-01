const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const UserController = require("../(1)controllers/users.controller.js");
const userController = new UserController();
const uploaduserImage = require('../modules/user_s3.js');


router.post(
    "/users",
    uploaduserImage.single("image"),
    userController.signup);



// 닉네임 중복 확인 API
router.post(
    "/checkNickname",
    userController.checkNickname);

// 회원탈퇴 API
router.delete(
    "/withdraw",
    authMiddleware,
    userController.deleteSignup);


router.post(
    "/login",
    userController.login);


router.delete(
    "/logout",
    userController.logout);

router.post(
    "/authCodeSend",
    userController.authCodeSend);

router.post(
    "/authCodeValidation",
    userController.authCodeValidation);

//카카오 로그인
router.post(
    '/kakao/signin',
    userController.signInKakao)


module.exports = router;
