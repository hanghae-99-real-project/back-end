const NotificationService = require("@services/notification.service.js");

class NotificationController {
    notificationService = new NotificationService();


    // 특정 유저의 모든 알림 조회
    getNotificationForUser = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;

            const notifications = await this.notificationService.getNotificationsByUserId(userId);

            res.status(200).json({ notificationsData: notifications });
        } catch (error) {
            error.failedApi = "알림 조회"
            throw error;
        }
    }

    // 알림 상태 변경 // 읽음 or 안읽음 //isRead로 진실 혹은 거짓 표시
    markAsRead = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { notificationId } = req.params;

            const notification = await this.notificationService.getNotificationsByUserIds(notificationId, userId);

            if (!notification) {
                throw new Error("401/해당 알림을 확인할 수 없습니다.");
            }

            await this.notificationService.markAsRead(notificationId, userId);

            res.status(200).json({ message: "알림을 확인하였습니다." })
        } catch (error) {
            error.failedApi = "알림 확인"
            throw error;
        }
    }
}
module.exports = NotificationController;