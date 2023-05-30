const NotificationService = require("../(2)services/notification.service.js");

class NotificationController {
    notificationService = new NotificationService();

    // // 알림 생성
    // createNotification = async (req, res, next) => {
    //     try {
    //         const { userId, postId, commentId, childCommentId } = req.body;

    //         await this.notificationService.createNotification(userId, postId, commentId, childCommentId);
    //         res.status(201).json({ message: "알림이 DB에 저장되었습니다." })
    //     } catch (error) {
    //         error.failedApi = "알림 생성"
    //         throw error
    //     }
    // }

    // // 특정 유저의 모든 알림 조회
    // getNotificationForUser = async (req, res, next) => {
    //     try {
    //         const { userId } = req.params;
    //         const notifications = await this.notificationService.getNotificationsByUserId(userId);

    //         res.status(200).json(notifications);
    //     } catch (error) {
    //         error.failedApi = "알림 조회"
    //         throw error
    //     }
    // }

    // // 알림 상태 변경 // 읽음 or 안읽음 //isRead로 진실 혹은 거짓 표시
    // markAsRead = async (req, res, next) => {
    //     try {
    //         const { notificationId } = req.params;

    //         await this.notificationService.markAsRead(notificationId);

    //         res.status(200).json({ message: "알림 읽음" })
    //     } catch (error) {
    //         error.failedApi = "알림 읽음 or 안읽음"
    //         throw error
    //     }
    // }
}
module.exports = NotificationController;