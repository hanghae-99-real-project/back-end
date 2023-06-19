const ChildCommentService = require("@services/childComment.service.js");
// const PostsService = require("../services/posts.service.js");

class ChildCommentController {
    childCommentService = new ChildCommentService();
    // postsService = new PostsService();

    // 대댓글과 비밀 대댓글 생성
    createChildComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId, commentId } = req.params;
        const { childComment, isPrivate } = req.body;
        await this.childCommentService.createChildComment(userId, postId, commentId, childComment, isPrivate);
        res.status(201).json({ message: "대댓글을 작성하였습니다." })
    };

    // 대댓글과 비밀 대댓글 조회
    getChildComments = async (req, res, next) => {
        const { postId, commentId } = req.params;
        const userId = res.locals.user ? res.locals.user.userId : null;
        const childComments = await this.childCommentService.findChildCommentsByCommentId(postId, commentId, userId);
        return res.status(200).json({ childCommentsData: childComments })
    };

    // 대댓글 삭제
    deleteChildComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId, commentId, childCommentId } = req.params
        await this.childCommentService.deleteChildComment(userId, postId, commentId, childCommentId);
        return res.status(200).json({ message: "대댓글을 삭제하였습니다." });
    };
}

module.exports = ChildCommentController;