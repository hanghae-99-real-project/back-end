const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PoosController = require("../controllers/poo.controller");
const pooController = new PoosController();
const uploadpooImage = require("../modules/poo_s3");
const casheCheck = require("../middlewares/checkCahche-middleware")



//푸박스 등록
router.post("/", authMiddleware, uploadpooImage.single("pooPhotoUrl"), pooController.postPoo);

//푸박스 조회 캐싱 미들웨어 추가
router.get("/", casheCheck, pooController.getPoo);

//푸박스 상세조회
//router.get("/:pooId", casheCheck, pooController.getPooDetail);

module.exports = router;
