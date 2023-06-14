const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const MyPagesController = require("../controllers/mypage.controller");
const myPagesController = new MyPagesController();

//마이페이지 조회
router.get("/mypage", authMiddleware, myPagesController.getMyInfo);

//마이페이지 내가 작성한 게시글 조회
router.get("/mypage/mypost", authMiddleware, myPagesController.getMyPost);

//마이페이지 내가 북마크한 게시글 조회
router.get("/mypage/bookmark", authMiddleware, myPagesController.getMyBookmark);

//마이페이지 내가 등록한 푸박스 조회
router.get("/mypage/mypoo", authMiddleware, myPagesController.getMyPoo);


module.exports = router;
