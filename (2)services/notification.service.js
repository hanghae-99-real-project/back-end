const NotificationRepository = require("../(3)repositories/notification.repository.js");
const { Notifications } = require("../models");

class NotificationService {
    notificationRepository = new NotificationRepository(Notifications);

    // // 알림 생성
    // createNotification = async (userId, postId, commentId, childCommentId) => {
    //     return await this.notificationRepository.createNotification(userId, postId, commentId, childCommentId);
    // }

    // // 특정 유저의 모든 알림 조회
    // getNotificationsByUserId = async (userId) => {
    //     return await this.notificationRepository.getNotificationsByUserId(userId);
    // }

    // // 알림 상태 변경 // 읽음 or 안읽음 //isRead로 진실 혹은 거짓 표시
    // markAsRead = async (notificationId, isRead) => {
    //     return await this.notificationRepository.updateNotification(notificationId, isRead)
    // }
}
module.exports = NotificationService;