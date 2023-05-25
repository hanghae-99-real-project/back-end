const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const MyPagesController = require("../(1)controllers/mypage.controller");
const myPagesController = new MyPagesController();


router.get("/mypage/:userId", authMiddleware, myPagesController.getMyInfo);
router.get("/mypage/mypost", authMiddleware, myPagesController.getMyPost);
router.get("/mypage/bookmark", authMiddleware, myPagesController.getMyBookmark);


module.exports = router;
