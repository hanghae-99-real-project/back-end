const NotificationRepository = require("@repositories/notification.repository.js");
const { Notifications, Users, Comments, ChildComments } = require("@models");

class NotificationService {
    notificationRepository = new NotificationRepository(Notifications, Users, Comments, ChildComments);


    // 특정 유저의 모든 알림 조회
    getNotificationsByUserId = async (userId) => {
        const notifications = await this.notificationRepository.getCommentNotificationsByUserId(userId);
        const notificationMessage = await Promise.all(
            notifications.map(async (notification) => {
                let commentNotification = notification.get({ plain: true });
                let plainUser = notification.User.get({ plain: true });

                // ChildCommentId 가 null일 때 댓글만 보여지게 하고, ChildCommentId가 null이 아닐 때 대댓글만 보여지게 알림 설정
                let message;
                if (commentNotification.ChildCommentId == null) {
                    message = `${plainUser.nickname}님의 게시글에 댓글이 작성되었습니다.`;
                    delete commentNotification.ChildComment; // 만약 댓글이 있으면 대댓글 삭제
                } else {
                    message = `${plainUser.nickname}님이 게시글에 대댓글이 작성되었습니다.`;
                    delete commentNotification.Comment;  // 만약 대댓글이 있으면 댓글 삭제

                }

                return {
                    ...commentNotification,
                    User: {
                        ...plainUser,
                        nickname: message
                    }
                };
            })
        )
        return notificationMessage;

    };

    // 알림 상태 변경 // 읽음 or 안읽음 //isRead로 진실 혹은 거짓 표시
    getNotificationsByUserIds = async (notificationId, userId) => {
        try {
            const notification = await this.notificationRepository.getNotificationsByUserIds(notificationId, userId);

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