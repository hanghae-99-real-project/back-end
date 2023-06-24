class NotificationRepository {
    constructor(notificationsModel, usersModel, commentsModel, childCommentsModel) {
        this.notificationsModel = notificationsModel;
        this.usersModel = usersModel;
        this.commentsModel = commentsModel;
        this.childCommentsModel = childCommentsModel;
    }

    // 알림 생성 
    createNotification = async (userId, postId, commentId, childCommentId) => {
        return await this.notificationsModel.create({
            UserId: userId,
            PostId: postId,
            CommentId: commentId,
            ChildCommentId: childCommentId,
        });
    }

    // 특정 유저의 모든 댓글 알림 조회
    getCommentNotificationsByUserId = async (userId) => {
        const notifications = await this.notificationsModel.findAll({
            where: {
                UserId: userId,
            },
            order: [["createdAt", "DESC"]], // 최신 알림부터 반환
            include: [
                {
                    model: this.usersModel,
                    attributes: ["userPhoto", "nickname"]
                },
                {
                    model: this.commentsModel,
                    attributes: ["comment"]
                },
                {
                    model: this.childCommentsModel,
                    attributes: ["childComment"]
                }
            ]
        });
        return notifications
    }

    getCommentById = async (commentId) => {
        const comment = await this.commentsModel.findOne(
            {
                where: {
                    commentId,
                },
                include: [
                    {
                        model: this.usersModel,
                        attributes: ["nickname", "userPhoto"]
                    },
                ]
            }
        );
        console.log(comment) // 인클루드 안댐
        return comment
    };

    // Retrieve a childComment by its ID
    getChildCommentById = async (childCommentId) => {
        return await this.childCommentsModel.findOne(
            {
                where: {
                    childCommentId,
                },
                include: [
                    {
                        model: this.usersModel,
                        attributes: ["userPhoto", "nickname"]
                    },
                ]
            }
        );
    };


    // 알림 상태 변경 // 읽음 or 안읽음 //isRead로 진실 혹은 거짓 표시
    updateNotification = async (notificationId, userId) => {
        return await this.notificationsModel.update({
            isRead: true
        },
            {
                where: {
                    notificationId,
                    UserId: userId
                }
            });
    }

    getNotificationByIdAndUserId = async (notificationId, userId) => {
        return await this.notificationsModel.findOne({
            where: {
                notificationId,
                UserId: userId
            }
        });
    }
}

module.exports = NotificationRepository;