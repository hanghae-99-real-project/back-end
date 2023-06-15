const { Op } = require("sequelize");

class CommentRepository {
    constructor(commentsModel, usersModel, postsModel) {
        this.commentsModel = commentsModel;
        this.usersModel = usersModel;
        this.postsModel = postsModel;
    };

    // 게시글 한 개 조회
    findPostById = async (postId) => {
        return await this.postsModel.findOne({
            where: { postId },
        });
    };

    // 아이디가 일치하는 사용자 조회
    findUserById = async (userId) => {
        return await this.usersModel.findOne({
            where: { userId },
        });
    };

    // 댓글 생성
    createComment = async (userId, postId, comment, commentPhotoUrl, isPrivate,
        // commentLatitude, 
        // commentLongitude, 
        // address
    ) => {
        const createdComment = await this.commentsModel.create({
            UserId: userId, PostId: postId, comment, commentPhotoUrl, isPrivate: isPrivate,
            // commentLatitude,
            // commentLongitude,
            // address,
        });
        return createdComment;
    };

    // 게시물 아이디의 전체 댓글 조회
    findCommentsByPostId = async (postId) => {
        return await this.commentsModel.findAll({ where: { postId } });
    };

    // 댓글 아이디로 댓글 하나 조회
    findCommentById = async (commentId) => {
        return await this.commentsModel.findOne({ where: { commentId } });
    };

    // 댓글 수정
    updateComment = async (userId, postId, commentId, comment) => {
        return await this.commentsModel.update(
            { comment },
            {
                where: {
                    [Op.and]: [{ commentId }, { PostId: postId }, { UserId: userId }]
                },
            },
        );
    };

    // 댓글 삭제
    deleteComment = async (userId, postId, commentId) => {
        return await this.commentsModel.destroy({
            where: {
                [Op.and]: [{ UserId: userId }, { PostId: postId }, { commentId }],
            },
        });
    };
};

module.exports = CommentRepository;