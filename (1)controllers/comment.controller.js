const CommentService = require("../(2)services/comment.service.js");
// const PostsService = require("../(2)services/posts.service.js");

class CommentController {
    commentService = new CommentService();
    // postsService = new PostsService();

    // 댓글 생성
    createComment = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { postId } = req.params;
            const { comment } = req.body;
            const { commentPhotoUrl } = req;

            if (!comment) {
                throw new Error("403/댓글 작성에 실패하였습니다.");
            }

            // 게시글이 존재하는지 여부 확인
            // const post = await this.postsService.xxxx(postId); 
            const post = await this.commentService.findPostById(postId);

            if (!post) {
                throw new Error("403/게시물이 존재하지 않습니다");
            }

            await this.commentService.createComment(userId, postId, comment, commentPhotoUrl);

            res.status(201).json({ message: "댓글을 작성하였습니다." });
        } catch (error) {
            error.failedApi = "댓글 생성";
            throw error;
        }
    };

    // // 비밀 댓글 생성
    // createSecretComment = async (req, res, next) => {
    //     try {
    //         const { userId } = res.locals.user;
    //         const { postId } = req.params;
    //         const { comment } = req.body;
    //         const { commentPhotoUrl } = req;

    //         if (!comment) {
    //             throw new Error("403/댓글 작성에 실패하였습니다.");
    //         }

    //         const post = await this.commentService.findPostById(postId);
    //         if (!post) {
    //             throw new Error("403/게시물이 존재하지 않습니다");
    //         }

    //         // 비밀 댓글 생성 로직 추가
    //         await this.commentService.createSecretComment(userId, postId, comment, commentPhotoUrl);

    //         res.status(201).json({ message: "비밀 댓글을 작성하였습니다." });
    //     } catch (error) {
    //         error.failedApi = "비밀 댓글 생성";
    //         throw error;
    //     }
    // };

    // 전체 댓글 조회
    readComments = async (req, res, next) => {
        try {
            const { postId } = req.params;

            const post = await this.commentService.findPostById(postId);
            if (!post) {
                throw new Error("403/게시물이 존재하지 않습니다.");
            }

            // 댓글이 존재하는지 여부 확인
            const comments = await this.commentService.findCommentsByPostId(postId);
            if (!comments) {
                throw new Error("403/댓글이 존재하지 않습니다.");
            }

            return res.status(200).json({ commentsData: comments });
        } catch (error) {
            error.failedApi = "댓글 조회";
            throw error;
        }
    };

    // // 비밀 댓글 조회
    // readSecretComments = async (req, res, next) => {
    //     try {
    //         const { postId } = req.params;

    //         const post = await this.commentService.findPostById(postId);
    //         if (!post) {
    //             throw new Error("403/게시물이 존재하지 않습니다.");
    //         }

    //         const secretComments = await this.commentService.findSecretCommentsByPostId(postId);
    //         if (!secretComments) {
    //             throw new Error("403/비밀 댓글이 존재하지 않습니다.");
    //         }

    //         return res.status(200).json({ secretCommentsData: secretComments });
    //     } catch (error) {
    //         error.failedApi = "비밀 댓글 조회"
    //         throw error;
    //     }
    // };

    // 댓글 수정
    fixComment = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { postId, commentId } = req.params;
            const { comment } = req.body;

            const post = await this.commentService.findPostById(postId);
            if (!post) {
                throw new Error("403/게시물이 존재하지 않습니다.");
            }

            const comments = await this.commentService.findCommentById(commentId);
            if (!comments) {
                throw new Error("403/댓글이 존재하지 않습니다.");
            }

            await this.commentService.updateComment(userId, postId, commentId, comment);

            return res.status(200).json({ message: "댓글을 수정하였습니다." });
        } catch (error) {
            error.failedApi = "댓글 수정";
            throw error;
        }
    }

    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { postId, commentId } = req.params;

            const post = await this.commentService.findPostById(postId);
            if (!post) {
                throw new Error("403/게시물이 존재하지 않습니다.");
            }

            const comment = await this.commentService.findCommentById(commentId);
            if (!comment) {
                throw new Error("403/댓글이 존재하지 않습니다.");
            }

            if (comment.UserId !== userId) {
                throw new Error("403/댓글 삭제 권한이 존재하지 않습니다.");
            }

            await this.commentService.deleteComment(userId, postId, commentId);

            return res.status(200).json({ message: "댓글을 지웠습니다." });
        } catch (error) {
            error.failedApi = "댓글 삭제";
            throw error;
        }
    };
};

module.exports = CommentController;