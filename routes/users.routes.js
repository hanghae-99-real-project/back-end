const express = require("express");

const router = express.Router();
const checkSession = require("@middlewares/checkSession-middleware")
const authMiddleware = require("@middlewares/auth-middleware");
const UserController = require("@controllers/users.controller.js");
const userController = new UserController();
const uploaduserImage = require('@modules/user_s3.js');


router.post(
    "/users",
    uploaduserImage.single("userPhoto"),
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


router.put(
    "/nickname",
    authMiddleware,
    uploaduserImage.single("userPhoto"),
    userController.updatenickname
);

router.put(
    "/pass",
    authMiddleware,
    uploaduserImage.single("userPhoto"),
    userController.updatepass
);

router.put(
    "/image/:imageIndex",
    authMiddleware,
    uploaduserImage.single("userPhoto"),
    userController.updateimage
);


router.put(
    "/newpass",
    userController.newpass
);


router.put(
    "/findnick",
    userController.findnick
);


module.exports = router;
