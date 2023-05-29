const PostService = require("../(2)services/posts.service");
const postService = new PostService();
const CommentsService = require("../(2)services/comment.service");
const getAddress = require("../modules/kakao")


class PostController {
  commentsService = new CommentsService();

  createPost = async (req, res) => {
    try {
      const { userId, nickname } = res.locals.user;
      const { dogname, title, content, lostLatitude, lostLongitude } = req.body;
      const { photoUrl } = req;
      let address = await getAddress(commentLatitude, commentLongitude);
      if (!address) {
          address = `${commentLatitude}, ${commentLongitude}`
      }

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
        dogname,
        UserId: userId,
        nickname,
        title,
        content,
        photoUrl,
        lostLatitude,
        lostLongitude,
        likes: 0,
        views: 0,
        likeCount: 0,
        commentCount: 0,
        address
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
      res.json({ data: post});
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
    }
  };

  updatePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content, dogname } = req.body;
      const { photoUrl } = req;
      const { lostLatitude, lostLongitude, } = req.body
      const address = await getAddress(commentLatitude, commentLongitude);
      if (!address) {
          address = `${commentLatitude}, ${commentLongitude}`
      }
      await postService.updatePost(
        dogname,
        userId,
        postId,
        title,
        content,
        photoUrl,
        lostLatitude,
        lostLongitude,
        address
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