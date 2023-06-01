const express = require("express");
const router = express.Router();

const NotificationController = require("../(1)controllers/notification.controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

const notificationController = new NotificationController();

// 특정 유저의 모든 알림 조회
router.get("/", authMiddleware, notificationController.getNotificationForUser);

// // 알림 상태 변경 // 읽음 or 안읽음 //isRead로 진실 혹은 거짓 표시
// router.put("/:notificationId", authMiddleware, notificationController.markAsRead);

module.exports = router;


/* 알림

-- 댓글 알림 --
1. 댓글을 작성했을 때 게시물 작성자에게 알림 생성 // comment service 부분에 게시물 작성자 알림 생성 로직 추가
2. 게시물 작성자가 모든 알림을 조회하는 get 요청 // 게시물에 댓글을 단 댓글 내용만 조회되게 하기 // notification.routes에서 get 방식으로 알림 조회 // userPhoto, `${nickname}님이 댓글을 달았습니다.`, comment
3. 게시물 작성자가 알림을 조회 했을 때 알림 상태 변경(읽음, 안읽음) - isRead로 true -- or -- false 나타내주기 // notification.routes에서 put 방식으로 설정 

-- 대댓글 알림 --
1. 대댓글을 작성했을 때 게시물 작성자에게 알림 생성 // comment service 부분에 게시물 작성자와 댓글 작성자에게 알림 생성
2. 게시물 작성자와 댓글 작성자가 알림을 조회하는 get 요청 // 게시물에 대댓글을 단 대댓글 내용만 조회되게 하기 //notification.routes에서 get 방식으로 알림 조회
3. 게시물 작성자와 댓글 작성자가 알림을 조회 했을 때 알림 상태 변경(읽음, 안읽음) - isRead로 true -- or -- false 나타내주기 // notification.routes에서 put 방식으로 설정 

*/

