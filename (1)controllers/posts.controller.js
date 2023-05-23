const PostService = require("../(2)services/posts.service");
const postService = new PostService();
const CommentsService = require("../(2)services/comment.service");

class PostController {
  commentsService = new CommentsService();

  createPost = async (req, res) => {
    try {
      const { userId, nickname } = res.locals.user;
      const { title, content } = req.body;
      const { photoUrl } = req;

      if (!title) {
        return res
          .status(412)
          .json({ message: "모든 필드의 값은 필수 값 입니다." });
      }
      if (!content) {
        return res
          .status(412)
          .json({ message: "모든 필드의 값은 필수 값 입니다." });
      }


      const postData = {
        userId,
        nickname,
        title,
        content,
        photoUrl,
        like: 0,
        likeCount: 0,
      };
      await postService.createPost(postData);
      return res.status(201).json({ message: "게시글 작성에 성공하였습니다." });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 작성에 실패하였습니다." });
    }
  };

  getPosts = async (req, res) => {
    try {
      const posts = await postService.getPosts();
      const result = await Promise.all(
        posts.map(async (a) => {
          const b = await this.commentsService.getComments(a.postId);
          return (a.commentCount = b.length);
        })
      );

      if (posts.error) {
        throw new Error(posts.message);
      }

      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
    }
  };

  getPostById = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await postService.getPostById(postId);
      const comments = await this.commentsService.getComments(postId);
      res.json({ data: post, commentsCount: comments.length });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
    }
  };

  updatePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;
      const { photoUrl } = req;
      await postService.updatePost(
        userId,
        postId,
        title,
        content,
        photoUrl
      );
      res.status(200).json({ message: "게시글을 수정하였습니다." });
    } catch (err) {
      console.error(err);
      res.status(400).send({ errorMessage: "게시글 수정에 실패하였습니다." });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      await postService.deletePost(userId, postId);
      res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } catch (err) {
      console.error(err);
      res.status(400).send({ errorMessage: "게시글 삭제에 실패하였습니다." });
    }
  };

}

module.exports = PostController;