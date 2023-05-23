const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const MyPagesController = require("../(1)controllers/mypage.controller");
const myPagesController = new MyPagesController();


//:userId
router.get("/mypage", authMiddleware, myPagesController.getMyInfo);


module.exports = router;
