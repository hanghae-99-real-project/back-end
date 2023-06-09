const CommentRepository = require("@repositories/comment.repository.js");
const NotificationRepository = require("@repositories/notification.repository.js");
// const getAddress = require("../modules/kakao")

const { Comments, Users, Posts, Notifications } = require("@models");

class CommentService {
    commentRepository = new CommentRepository(Comments, Users, Posts);
    notificationRepository = new NotificationRepository(Notifications);

    // 댓글 생성 시에 게시글 작성자에게만 알림이 가도록 설정
    // 게시글 작성자가 자신의 개시글에 댓글을 달면 알림이 가지 않도록 하기

    // 댓글 생성
    createComment = async (userId, postId, comment, commentPhotoUrl, isPrivate,
        // commentLatitude, 
        // commentLongitude
    ) => {
        try {
            if (!comment) {
                throw new Error("401/댓글 작성에 실패하였습니다.");
            }
            // let address = await getAddress(commentLatitude, commentLongitude);
            // if (!address) {
            //     address = `${commentLatitude}, ${commentLongitude}`
            // }
            // 댓글 생성 후 알림을 생성
            const post = await this.commentRepository.findPostById(postId);
            // 게시글이 존재하는지 여부 확인
            if (!post) {
                throw new Error("401/게시물이 존재하지 않습니다.");
            }
            const createcomment = await this.commentRepository.createComment(userId, postId, comment, commentPhotoUrl, isPrivate,
                // commentLatitude, 
                // commentLongitude, 
                // address
            );
            const postUserId = post.UserId; // 게시물의 작성자 Id를 갖고옴
            const commentId = createcomment.commentId; // 방금 생성된 댓글의 Id를 갖고옴
            // 게시글 작성자와 댓글 작성자가 다르면 알림 생성
            if (postUserId !== userId) {
                await this.notificationRepository.createNotification(postUserId, postId, commentId)
            }
            return createcomment
        } catch (error) {
            error.failedApi = "댓글 생성";
            throw error;
        }
    };

    // 게시물 아이디의 전체 댓글 조회
    findCommentsByPostId = async (postId,
        // userId
    ) => {
        try {
            const comments = await this.commentRepository.findCommentsByPostId(postId);
            if (!comments) {
                throw new Error("401/댓글이 존재하지 않습니다.");
            }
            const post = await this.commentRepository.findPostById(postId);
            if (!post) {
                throw new Error("401/게시물이 존재하지 않습니다.");
            }
            // const postUserId = post.UserId // 해당 게시물의 작성자 ID를 가져옴
            const commentsWithDetail = await Promise.all(
                comments.map(async (comment) => {
                    const user = await this.commentRepository.findUserById(comment.UserId);

                    // 로그인하지 않은 유저가 비밀 댓글 조회 X
                    // 비밀 댓글 작성자가 아닐 때 비밀 댓글 조회 X
                    // 게시글 작성자가 아닐 때 비밀 댓글 조회 X
                    // if ((!userId && comment.isPrivate) || (comment.isPrivate && comment.UserId !== userId && postUserId !== userId)) {
                    //     return null;
                    // }

                    return {
                        commentId: comment.commentId,
                        UserId: comment.UserId,
                        PostId: comment.PostId,
                        comment: comment.comment,
                        commentPhotoUrl: comment.commentPhotoUrl, // comment photoUrl
                        nickname: user.nickname,
                        userPhoto: user.userPhoto, // userphotoUrl
                        // commentLatitude: comment.commentLatitude,
                        // commentLongitude: comment.commentLongitude,
                        // address: comment.address,
                        isPrivate: comment.isPrivate,
                        createdAt: comment.createdAt,
                        updatedAt: comment.updatedAt,
                    };
                }),
            )

            return commentsWithDetail.filter(comment => comment !== null).sort((a, b) => a.createdAt - b.createdAt);
        } catch (error) {
            error.failedApi = "댓글 조회";
            throw error;
        }
    };

    // 댓글 수정
    updateComment = async (userId, postId, commentId, comment) => {
        try {
            const post = await this.commentRepository.findPostById(postId);
            if (!post) {
                throw new Error("401/게시물이 존재하지 않습니다.");
            }
            const comments = await this.commentRepository.findCommentById(commentId);
            if (!comments) {
                throw new Error("401/댓글이 존재하지 않습니다.");
            }

            return await this.commentRepository.updateComment(userId, postId, commentId, comment);
        } catch (error) {
            error.failedApi = "댓글 수정";
            throw error;
        }
    }

    // 댓글 삭제
    deleteComment = async (userId, postId, commentId) => {
        try {
            const post = await this.commentRepository.findPostById(postId);
            if (!post) {
                throw new Error("401/게시물이 존재하지 않습니다.");
            }
            const comments = await this.commentRepository.findCommentById(commentId);
            if (!comments) {
                throw new Error("401/댓글이 존재하지 않습니다.");
            }
            if (comments.UserId !== userId) {
                throw new Error("401/댓글 삭제 권한이 존재하지 않습니다.");
            }
            return await this.commentRepository.deleteComment(userId, postId, commentId);
        } catch (error) {
            error.failedApi = "댓글 삭제";
            throw error;
        }
    };
};

module.exports = CommentService;