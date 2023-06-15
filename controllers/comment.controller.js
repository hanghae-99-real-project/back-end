const CommentService = require("@services/comment.service.js");

class CommentController {
    commentService = new CommentService();

    // 댓글 생성
    createComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId } = req.params;
        const { comment, isPrivate,
            // commentLatitude, 
            // commentLongitude 
        } = req.body;
        const { commentPhotoUrl } = req;
        await this.commentService.createComment(userId, postId, comment, commentPhotoUrl, isPrivate,
            // commentLatitude, 
            // commentLongitude
        );
        return res.status(201).json({ message: "댓글을 작성하였습니다." });
    };

    // 전체 댓글 조회 
    readComments = async (req, res, next) => {
        const { postId } = req.params;
        const userId = res.locals.user ? res.locals.user.userId : null; // 로그인을 했을 때와 로그인을 하지 않았을 때의 사용자 구분
        // const { userId } = res.locals.user || {}; // 위랑 똑같            
        // 댓글이 존재하는지 여부 확인 
        const comments = await this.commentService.findCommentsByPostId(postId, userId);
        return res.status(200).json({ commentsData: comments });
    };

    // 댓글 수정
    fixComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId, commentId } = req.params;
        const { comment } = req.body;
        await this.commentService.updateComment(userId, postId, commentId, comment);
        return res.status(200).json({ message: "댓글을 수정하였습니다." });
    }

    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId, commentId } = req.params;
        await this.commentService.deleteComment(userId, postId, commentId);
        return res.status(200).json({ message: "댓글을 지웠습니다." });
    };
};

module.exports = CommentController;