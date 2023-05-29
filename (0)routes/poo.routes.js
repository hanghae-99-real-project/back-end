const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PoosController = require("../(1)controllers/poo.controller");
const pooController = new PoosController();
const uploadpooImage = require("../modules/poo_s3");



//푸박스 등록
router.post("/", authMiddleware, uploadpooImage.single("pooPhotoUrl"), pooController.postPoo);

//푸박스 조회
router.get("/", pooController.getPoo);

//푸박스 상세조회
router.get("/:pooId", pooController.getPooDetail);

module.exports = router;
