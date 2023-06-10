const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const MyPagesController = require("../controllers/mypage.controller");
const myPagesController = new MyPagesController();


router.get("/mypage/", authMiddleware, myPagesController.getMyInfo);
router.get("/mypage/mypost", authMiddleware, myPagesController.getMyPost);
router.get("/mypage/bookmark", authMiddleware, myPagesController.getMyBookmark);


module.exports = router;
