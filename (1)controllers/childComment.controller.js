const ChildCommentService = require("../(2)services/childComment.service.js");
const CommentService = require("../(2)services/comment.service.js");
// const PostsService = require("../(2)services/posts.service.js");

class ChildCommentController {
    childCommentService = new ChildCommentService();
    commentService = new CommentService();
    // postsService = new PostsService();

    // 대댓글 생성
    createChildComment = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { postId, commentId } = req.params;
            const { childComment } = req.body;

            if (!childComment) {
                throw new Error("403/대댓글 작성에 실패하였습니다.");
            }

            // 게시글이 존재하는지 여부 확인
            // const post = await this.postsService.xxxx(postId); 
            const post = await this.commentService.findPostById(postId);

            if (!post) {
                throw new Error("403/게시물이 존재하지 않습니다");
            }

            // 댓글이 존재하는지 여부 확인
            const comments = await this.commentService.findCommentById(commentId);
            if (!comments) {
                throw new Error("403/댓글이 존재하지 않습니다.");
            }

            await this.childCommentService.createChildComment(userId, postId, commentId, childComment);

            res.status(201).json({ message: "대댓글을 작성하였습니다." })
        } catch (error) {
            error.failedApi = "대댓글 생성";
            throw error;
        }
    };

    // 대댓글 조회
    readChildComments = async (req, res, next) => {
        try {
            const { commentId } = req.params;

            // 댓글이 존재하는지 여부 확인
            const comments = await this.commentService.findCommentById(commentId);
            if (!comments) {
                throw new Error("403/댓글이 존재하지 않습니다.");
            }

            // 대댓글 존재 여부 확인
            const childComments = await this.childCommentService.findChildCommentsByCommentId(commentId);
            if (!childComments) {
                throw new Error("403/대댓글이 존재하지 않습니다");
            }

            return res.status(200).json({ childCommentsData: childComments })
        } catch (error) {
            error.failedApi = "대댓글 조회";
            throw error;
        }
    };

    // 대댓글 삭제
    deleteChildComment = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { postId, commentId, childCommentId } = req.params

            // 게시글이 존재하는지 여부 확인
            // const post = await this.postsService.xxxx(postId); 
            const post = await this.commentService.findPostById(postId);
            if (!post) {
                throw new Error("403/게시물이 존재하지 않습니다");
            }

            // 댓글이 존재하는지 여부 확인
            const comment = await this.commentService.findCommentById(commentId);
            if (!comment) {
                throw new Error("403/댓글이 존재하지 않습니다.");
            }

            // 대댓글 존재 여부 확인
            const childComments = await this.childCommentService.findChildCommentById(childCommentId);
            if (!childComments) {
                throw new Error("403/대댓글이 존재하지 않습니다");
            }

            // 유저 아이디가 일치하지 않을 때
            if (childComments.UserId !== userId) {
                throw new Error("403/대댓글 삭제 권한이 존재하지 않습니다.");
            }

            await this.childCommentService.deleteChildComment(userId, postId, commentId, childCommentId);

            return res.status(200).json({ message: "댓글을 삭제하였습니다." });
        } catch (error) {
            error.failedApi = "대댓글 삭제";
            throw error;
        }
    };
}

module.exports = ChildCommentController;