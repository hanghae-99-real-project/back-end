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
      const { lostPhotoUrl } = req;
      // const { year, month, day, hour, minute } = req.body;
      // // 자바스크립트 달은 0부터 11까지이므로 month에 -1 을 해줌
      // const setDateTime = new Date(year, month - 1, day, hour, minute)

      let address = await getAddress(lostLatitude, lostLongitude);
      if (!address) {
        address = `${lostLatitude}, ${lostLongitude}`
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
        lostPhotoUrl,
        lostLatitude,
        lostLongitude,
        likes: 0,
        views: 0,
        likeCount: 0,
        commentCount: 0,
        address,
        status: 0,
        // setDateTime
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
      // const limit = 10;
      // const page = req.query.page ? req.query.page : 1;
      // const offset = (page - 1) * limit; // 페이지네이션

      const posts = await postService.getPosts(
        // limit, offset
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
      res.json({ data: post });
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
      const { lostPhotoUrl } = req;
      const { lostLatitude, lostLongitude, } = req.body
      const { address } = await getAddress(lostLatitude, lostLongitude);
      if (!address) {
        address = `${lostLatitude}, ${lostLongitude}`
      }
      await postService.updatePost(
        dogname,
        userId,
        postId,
        title,
        content,
        lostPhotoUrl,
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

  endPost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      await postService.endPost(userId, postId);
      res.status(200).json({ message: "게시글 상태 변경이 완료되었습니다." });
    } catch (err) {
      console.error(err);
      res.status(400).send({ errorMessage: "게시글 상태 변경에 실패하였습니다." });
    }
  };

}

module.exports = PostController;