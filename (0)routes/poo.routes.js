const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PooController = require("../(1)controllers/poo.controller");
const pooController = new PooController();
const uploadpooImage = require("../modules/poo_s3");



//게시글 작성
router.post("/", authMiddleware, uploadpooImage.single("pooPhotoUrl"), pooController.postPoo);

//게시글 조회
router.get("/", pooController.getPoo);

module.exports = router;
