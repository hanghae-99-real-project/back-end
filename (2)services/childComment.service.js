const ChildCommentRepository = require("../(3)repositories/childComment.repository.js");
const CommentRepository = require("../(3)repositories/comment.repository.js");
const NotificationRepository = require("../(3)repositories/notification.repository.js");


const { ChildComments, Comments, Users, Posts, Notifications } = require("../models");

class ChildCommentService {
    childCommentRepository = new ChildCommentRepository(ChildComments);
    commentRepository = new CommentRepository(Comments, Users, Posts);
    notificationRepository = new NotificationRepository(Notifications);

    /*
    1. 일반 댓글 작성 - 로그인한 유저는 게시물에 일반 댓글을 작성 가능
       일반 댓글 조회 - 일반 댓글은 모든 유저가 조회 가능. 로그인 하지 않은 유저도 조회 가능
    2. 일반 댓글에 일반 대댓글 작성 - 로그인한 유저는 일반 댓글에 일반 대댓글 작성 가능
       일반 댓글에 일반 대댓글 조회 - 일반 대댓글은 모든 유저가 조회 가능. 로그인 하지 않은 유저도 조회 가능
    3. 일반 댓글에 비밀 대댓글 작성 - 로그인한 유저는 일반 댓글에 비밀 대댓글 작성 가능
       일반 댓글에 비밀 대댓글 조회 - 비밀 대댓글 작성자와 상위 댓글 작성자만 조회 가능 -- OR -- 비밀 대댓글 작성자, 상위 댓글 작성자, 게시물 작성자도 조회 되게끔 가능 -- 둘 중 후자 선택
    4. 비밀 댓글 작성 - 로그인한 유저는 게시물에 비밀 댓글을 작성 가능
       비밀 댓글 조회 - 비밀 댓글 작성자와 게시물 작성자만 조회 가능
    5. 비밀 댓글에 일반 대댓글 작성 - 불가능하도록 설정 
       비밀 댓글에 일반 대댓글 조회 - 불가능하도록 설정. 비밀 댓글에는 비밀 대댓글만 작성 가능
    6. 비밀 댓글에 비밀 대댓글 작성 - 게시물 작성자와 비밀 댓글 작성자만 비밀 댓글에 비밀 대댓글 작성 가능
       비밀 댓글에 비밀 대댓글 조회 - 게시물 작성자와 비밀 댓글 작성자만 비밀 대댓글 조회 가능
       
       ----------------------------지우지 마시오.------------------------------
    */

    // 대댓글과 비밀 대댓글 생성
    createChildComment = async (userId, postId, commentId, childComment, isPrivate) => {
        // 상위 댓글 가져오기
        const parentComment = await this.commentRepository.findCommentById(commentId);
        // 상위 게시글 가져오기
        const parentPost = await this.commentRepository.findPostById(postId)
        // 상위 댓글이 비밀 댓글인 경우 체크
        if (parentComment.isPrivate) {
            // 비밀 대댓글이 아니라면 에러 발생
            if (!isPrivate) {
                throw new Error("404/비밀 댓글에는 비밀 대댓글만 작성할 수 있습니다.");
            }

            // 상위 댓글의 작성자 ID 가져오기
            const parentCommentUserId = parentComment.UserId;

            // 게시물 작성자 ID 가져오기
            const postUserId = parentPost.UserId;

            // 비밀 댓글 작성자 또는 게시물 작성자가 아닌 경우 에러 발생
            if (parentCommentUserId !== userId && postUserId !== userId) {
                throw new Error("404/비밀 댓글에는 댓글 작성자 또는 게시물 작성자만 대댓글을 작성할 수 있습니다.");
            }

        };
        const createChildComment = await this.childCommentRepository.createChildComment(userId, postId, commentId, childComment, isPrivate);

        // 알림 생성
        // 대댓글 작성자가 댓글 작성자와 다른 경우 댓글 작성자에게 알림
        if (userId !== parentComment.UserId) {
            await this.notificationRepository.createNotification(parentComment.UserId, postId, commentId, createChildComment.childCommentId);
        }

        // 대댓글 작성자가 게시글 작성자와 다른 경우 게시글 작성자에게 알림
        if (userId !== parentPost.UserId) {
            await this.notificationRepository.createNotification(parentPost.UserId, postId, commentId, createChildComment.childCommentId);
        }

        return createChildComment;
    };

    // 대댓글과 비밀 대댓글 조회
    findChildCommentsByCommentId = async (postId, commentId, userId) => {
        // 상위 댓글 가져오기
        const parentComment = await this.commentRepository.findCommentById(commentId);

        // 상위 댓글의 작성자 ID 가져오기
        // const parentCommentUserId = parentComment ? parentComment.UserId : null;
        const parentCommentUserId = parentComment.UserId;

        // 게시물 작성자 ID 가져오기
        const post = await this.commentRepository.findPostById(postId);
        const postUserId = post.UserId;

        // 비밀 댓글 작성자가 아닐 때 비밀 대댓글 조회 X
        // 게시물 작성자가 아닐 때 비밀 대댓글 조회 X
        if (parentComment.isPrivate && parentCommentUserId !== userId && postUserId !== userId) {
            throw new Error("404/비밀 댓글에 대한 비밀 대댓글은 비밀 댓글 작성자 또는 게시물 작성자만 볼 수 있습니다.");
        }

        // 상위 댓글이 비밀 댓글이 아니거나 조회하려는 유저가 댓글 작성자 또는 게시물 작성자인 경우에만 대댓글 조회
        const childComments = await this.childCommentRepository.findChildCommentsByCommentId(commentId);

        // 아래 로직은 그대로 유지
        const childCommentsWithDetail = await Promise.all(
            childComments.map(async (childComment) => {
                const user = await this.commentRepository.findUserById(childComment.UserId);

                // 비밀 대댓글인 경우 다음 조건들을 확인
                // 대댓글 작성자가 현재 조회하는 사용자와 다른 경우
                // 또는 상위 댓글 작성자 또는 게시물 작성자만 조회 가능
                if (childComment.isPrivate && childComment.UserId !== userId && parentCommentUserId !== userId && postUserId !== userId) {
                    return null;
                }

                return {
                    childCommentId: childComment.childCommentId,
                    UserId: childComment.UserId,
                    PostId: childComment.PostId,
                    CommentId: childComment.CommentId,
                    childComment: childComment.childComment,
                    nickname: user.nickname,
                    userPhoto: user.userPhoto, // userphotoUrl
                    createdAt: childComment.createdAt,
                    updatedAt: childComment.updatedAt
                }
            })
        )

        return childCommentsWithDetail.filter(comment => comment !== null).sort((a, b) => b.createdAt - a.createdAt);
    };

    // 대댓글 하나 찾기
    findChildCommentById = async (childCommentId) => {
        return await this.childCommentRepository.findChildCommentById(childCommentId);
    };

    // 대댓글 삭제
    deleteChildComment = async (userId, postId, commentId, childCommentId) => {
        return await this.childCommentRepository.deleteChildComment(userId, postId, commentId, childCommentId);
    };
};


module.exports = ChildCommentService;