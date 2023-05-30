const express = require("express");
const router = express.Router();

const NotificationController = require("../(1)controllers/notification.controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

const notificationController = new NotificationController();

// // 알림 생성
// router.post("/", authMiddleware, notificationController.createNotification);

// // 특정 유저의 모든 알림 조회
// router.get("/:userId", authMiddleware, notificationController.getNotificationForUser);

// // 알림 상태 변경 // 읽음 or 안읽음 //isRead로 진실 혹은 거짓 표시
// router.put("/:notificationId", authMiddleware, notificationController.markAsRead);

module.exports = router;