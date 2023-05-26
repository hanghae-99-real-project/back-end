const { Op } = require("sequelize");

class ChildCommentRepository {
    constructor(childCommentsModel, commentsModel) {
        this.childCommentsModel = childCommentsModel;
        this.commentsModel = commentsModel;
    };

    // 대댓글과 비밀 대댓글 생성
    createChildComment = async (userId, postId, commentId, childComment, isPrivate) => {
        const createdChildComment = await this.childCommentsModel.create({
            UserId: userId,
            PostId: postId,
            CommentId: commentId,
            childComment,
            isPrivate: isPrivate
        })
        return createdChildComment;
    };

    // 댓글 아이디의 전체 대댓글 조회
    findChildCommentsByCommentId = async (commentId) => {
        return await this.childCommentsModel.findAll({ where: { commentId } });
    };

    // 대댓글 하나 찾기
    findChildCommentById = async (childCommentId) => {
        return await this.childCommentsModel.findOne({ where: { childCommentId } });
    };

    // 대댓글 삭제
    deleteChildComment = async (userId, postId, commentId, childCommentId) => {
        return await this.childCommentsModel.destroy({
            where: {
                [Op.and]: [{ UserId: userId }, { PostId: postId }, { CommentId: commentId }, { childCommentId }]
            }
        });
    };
}

module.exports = ChildCommentRepository;