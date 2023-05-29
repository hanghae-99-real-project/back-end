const CommentRepository = require("../(3)repositories/comment.repository.js");
// const UsersRepository = require("../repositories/users.repository.js");
const getAddress = require("../modules/kakao")

const { Comments, Users, Posts } = require("../models");

class CommentService {
    commentRepository = new CommentRepository(Comments, Users, Posts);
    // usersRepository = new UsersRepository(Users);

    // 댓글 생성
    createComment = async (userId, postId, comment, commentPhotoUrl, isPrivate, commentLatitude, commentLongitude) => {
        let address = await getAddress(commentLatitude, commentLongitude);
        if (!address) {
            address = `${commentLatitude}, ${commentLongitude}`
        }
        const createcomment = await this.commentRepository.createComment(userId, postId, comment, commentPhotoUrl, isPrivate, commentLatitude, commentLongitude, address);
        return createcomment
    }

    // 게시글 단순 조회
    findPostById = async (postId) => {
        return await this.commentRepository.findPostById(postId);
    };

    // 게시물 아이디의 전체 댓글 조회
    findCommentsByPostId = async (postId, userId) => {
        const comments = await this.commentRepository.findCommentsByPostId(postId);
        const post = await this.commentRepository.findPostById(postId);
        const postUserId = post ? post.UserId : null; // 해당 게시물의 작성자 ID를 가져옴 (게시물이 존재하면 작성자 ID, 없으면 null)

        const commentsWithDetail = await Promise.all(
            comments.map(async (comment) => {
                const user = await this.commentRepository.findUserById(comment.UserId);

                // 로그인하지 않은 유저가 비밀 댓글 조회 X
                // 비밀 댓글 작성자가 아닐 때 비밀 댓글 조회 X
                // 게시글 작성자가 아닐 때 비밀 댓글 조회 X
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
                    commentLatitude: comment.commentLatitude,
                    commentLongitude: comment.commentLongitude,
                    address: comment.address,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt,
                };
            }),
        )

        return commentsWithDetail.filter(comment => comment !== null).sort((a, b) => b.createdAt - a.createdAt); // null 값이 있으면 filter 사용 가능. 없어도 추 후를 위해 굳이 없애지 않아도 됨
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