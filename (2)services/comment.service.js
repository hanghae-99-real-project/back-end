const CommentRepository = require("../(3)repositories/comment.repository.js");
// const UsersRepository = require("../repositories/users.repository.js");

const { Comments, Users, Posts } = require("../models");

class CommentService {
    commentRepository = new CommentRepository(Comments, Users, Posts);
    // usersRepository = new UsersRepository(Users);

    // 댓글 생성
    createComment = async (userId, postId, comment, commentPhotoUrl, isPrivate) => {
        return await this.commentRepository.createComment(userId, postId, comment, commentPhotoUrl, isPrivate);
    }

    // 게시글 단순 조회
    findPostById = async (postId) => {
        return await this.commentRepository.findPostById(postId);
    };

    // 게시물 아이디의 전체 댓글 조회
    findCommentsByPostId = async (postId, userId) => {
        const comments = await this.commentRepository.findCommentsByPostId(postId);
        const post = await this.commentRepository.findPostById(postId);
        const postUserId = post ? post.UserId : null;

        const commentsWithDetail = await Promise.all(
            comments.map(async (comment) => {
                const user = await this.commentRepository.findUserById(comment.UserId);

                // // 로그인하지 않은 사용자는 비밀 댓글을 볼 수 없음
                // if (userId === null && comment.isPrivate) {
                //     return null;
                // }

                // // 비밀 댓글은 댓글 작성자와 게시글 작성자만 볼 수 있음
                // if (comment.isPrivate && comment.UserId !== userId && postUserId !== userId) {
                //     return null;
                // }

                // userId가 없는 경우 (로그인하지 않은 사용자) 또는 비밀 댓글이고 사용자가 댓글 작성자 또는 게시글 작성자가 아닌 경우
                if ((!userId && comment.isPrivate) || (comment.isPrivate && comment.UserId !== userId && postUserId !== userId)) {
                    return null;
                }

                return {
                    commentId: comment.commentId,
                    UserId: comment.UserId,
                    PostId: comment.PostId,
                    comment: comment.comment,
                    commentPhotoUrl: comment.commentPhotoUrl, // comment photoUrl
                    nickname: user.nickname,
                    userPhoto: user.userPhoto, // userphotoUrl
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt,
                };
            }),
        )

        return commentsWithDetail.filter(comment => comment !== null).sort((a, b) => b.createdAt - a.createdAt);
    };

    // 댓글 아이디로 댓글 조회
    findCommentById = async (commentId) => {
        return await this.commentRepository.findCommentById(commentId);
    };

    // 댓글 수정
    updateComment = async (userId, postId, commentId, comment) => {
        await this.commentRepository.updateComment(userId, postId, commentId, comment);
    }

    // 댓글 삭제
    deleteComment = async (userId, postId, commentId) => {
        await this.commentRepository.deleteComment(userId, postId, commentId);
    };
};

module.exports = CommentService;