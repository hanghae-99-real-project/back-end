const express = require('express');
const router = express.Router();

const ReportPooController = require("../(1)controllers/reportPoo.controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

const reportPooController = new ReportPooController();

// 신고 5회 이상 시 poo 게시글 삭제
router.put(
    "/:pooId",
    authMiddleware,
    reportPooController.postReportPoo
);


module.exports = router;