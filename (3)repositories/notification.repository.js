class NotificationRepository {
    constructor(notificationsModel) {
        this.notificationsModel = notificationsModel
    }

    // // 알림 생성 
    // createNotification = async (userId, postId, commentId, childCommentId) => {
    //     return await this.notificationsModel.create({
    //         UserId: userId,
    //         PostId: postId,
    //         CommentId: commentId,
    //         ChildCommentId: childCommentId,
    //     });
    // }

    // // 특정 유저의 모든 알림 조회
    // getNotificationsByUserId = async (userId) => {
    //     return await this.notificationsModel.findAll({
    //         where: { userId },
    //         order: [["createdAt", "DESC"]] // 최신 알림부터 반환
    //     });
    // }

    // // 알림 상태 변경 // 읽음 or 안읽음 //isRead로 진실 혹은 거짓 표시
    // markAsRead = async (notificationId, isRead) => {
    //     return await this.notificationsModel.update({ isRead }, { where: { notificationId } });
    // }
}

module.exports = NotificationRepository;