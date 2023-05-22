const CommentsService = require("../services/comment.service");
const PostsService = require("../services/posts.service");

class CommentsController {
  commentsService = new CommentsService();
  postsService = new PostsService();

  createComment = async (req, res) => {
    const { nickname, user_id } = res.locals.user;
    const { comment } = req.body;
    const { post_id } = req.params;
    const existPost = await this.postsService.getPostById(post_id);

    try {
      if (Object.keys(req.body).length === 0) {
        res.status(412).json({ message: "데이터 형식이 올바르지 않습니다." });
        return;
      }

      if (!existPost) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다" });
        return;
      }
      if (!comment) {
        res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });
        return;
      }
      const createComment = await this.commentsService.createComment(
        post_id,
        user_id,
        nickname,
        comment
      );
      res.status(201).json(createComment);
    } catch (err) {
      res.status(400).json({
        errorMessage: "댓글 작성에 실패하였습니다.",
      });
    }
  };

  getComments = async (req, res) => {
    const { post_id } = req.params;
    const existPost = await this.postsService.getPostById(post_id);
    const comments = await this.commentsService.getComments(post_id);

    try {
      if (!existPost) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다" });
        return;
      }
      res.status(200).json({ comments });
    } catch (err) {
      res.status(400).json({
        errorMessage: "댓글 조회에 실패하였습니다.",
      });
    }
  };

  putComment = async (req, res) => {
    const { comment_id, post_id } = req.params;
    const { user_id } = res.locals.user;
    const { comment } = req.body;
    const existPost = await this.postsService.getPostById(post_id);
    const existCom = await this.commentsService.findOneComment(comment_id);
    try {
      if (Object.keys(req.body).length === 0) {
        res.status(412).json({ message: "데이터 형식이 올바르지 않습니다." });
        return;
      }
      if (existCom.user_id !== user_id) {
        res
          .status(403)
          .json({ message: "댓글의 수정 권한이 존재하지 않습니다." });
        return;
      }

      if (!existPost) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다" });
        return;
      }

      if (!existCom) {
        res.status(404).json({ message: "댓글이 존재하지 않습니다" });
        return;
      }
      if (!comment) {
        res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });
        return;
      }
      const putComment = await this.commentsService.putComment(
        comment,
        comment_id,
        post_id,
        user_id
      );

      res.status(200).json(putComment);
    } catch (err) {
      res.status(400).json({
        errorMessage: "댓글 수정에 실패하였습니다.",
      });
    }
  };

  deleteComment = async (req, res) => {
    const { comment_id, post_id } = req.params;
    const { user_id } = res.locals.user;
    const post = await this.postsService.getPostById(post_id);
    const comment = await this.commentsService.findOneComment(comment_id);
    try {
      if (!post) {
        res.status(404).json({ message: "게시글이 존재하지 않습니다." });
        return;
      }
      if (!comment) {
        res.status(404).json({ message: "댓글이 존재하지 않습니다." });
        return;
      }
      if (comment.user_id !== user_id) {
        res
          .status(403)
          .json({ message: "댓글의 삭제 권한이 존재하지 않습니다." });
        return;
      }
      const deleteComment = await this.commentsService.deleteComment(
        comment_id,
        post_id,
        user_id
      );

      res.status(200).json(deleteComment);
    } catch (err) {
      res.status(400).json({
        errorMessage: "댓글 삭제에 실패하였습니다.",
      });
    }
  };
}

module.exports = CommentsController;
