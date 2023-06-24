const NotificationRepository = require("@repositories/notification.repository.js");
const { Notifications, Users, Comments, ChildComments } = require("@models");

class NotificationService {
    notificationRepository = new NotificationRepository(Notifications, Users, Comments, ChildComments);

    // 특정 유저의 모든 알림 조회
    getNotificationsByUserId = async (userId) => {
        try {
            const notifications = await this.notificationRepository.getCommentNotificationsByUserId(userId);
            const notificationMessage = await Promise.all(
                notifications.map(async (notification) => {
                    let commentNotification = notification.get({ plain: true });
                    let comment = null;
                    let user = null;
                    console.log(notification.User)
                    if (commentNotification.ChildCommentId == null) {
                        comment = await this.notificationRepository.getCommentById(commentNotification.CommentId);
                        user = comment && comment.User;
                    } else {
                        comment = await this.notificationRepository.getChildCommentById(commentNotification.ChildCommentId);
                        user = comment && comment.User;
                    }
                    const { userPhoto, nickname } = user ? user.get({ plain: true }) : {};

                    let message;
                    if (commentNotification.ChildCommentId == null) {
                        message = `${nickname}님이 댓글을 작성하였습니다.`;
                        delete commentNotification.ChildComment;
                    } else {
                        message = `${nickname}님이 대댓글을 작성하였습니다.`;
                        delete commentNotification.Comment;
                    }

                    return {
                        ...commentNotification,
                        User: {
                            ...(user && user.get({ plain: true })),
                            userPhoto,
                            nickname: message,
                        },
                    };
                })
            );
            return notificationMessage;
        } catch (error) {
            error.failedApi = "알림 조회"
            throw error;
        }
    };


    // 알림 상태 변경 // 읽음 or 안읽음 //isRead로 진실 혹은 거짓 표시
    getNotificationsByUserIds = async (notificationId, userId) => {
        try {
            const notification = await this.notificationRepository.getNotificationByIdAndUserId(notificationId, userId);

            if (!notification) {
                throw new Error("401/해당 알림을 확인할 수 없습니다.");
            }

            await this.notificationRepository.updateNotification(notificationId, userId)

            return { message: "알림을 확인하였습니다." }
        } catch (error) {
            error.failedApi = "알림 확인"
            throw error;
        }
    }
};
module.exports = NotificationService;