const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const page_middle = require("../middlewares/pagination-middleware");
const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();


module.exports = router;
