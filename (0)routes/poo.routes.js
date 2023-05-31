const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PoosController = require("../(1)controllers/poo.controller");
const pooController = new PoosController();
const uploadpooImage = require("../modules/poo_s3");


//푸박스 등록
router.post("/poo", authMiddleware, uploadpooImage.single("pooPhotoUrl"), pooController.postPoo);

//푸박스 조회 캐싱 미들웨어 추가
router.get("/poo", pooController.getPoo);

//푸박스 상세조회
router.get("/poo/:pooId", pooController.getPooDetail);

module.exports = router;
