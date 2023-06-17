const PostService = require("@services/posts.service");
const postService = new PostService();
const CommentsService = require("@services/comment.service");
const getAddress = require("@modules/kakao")
const UserService = require("@services/users.service.js");
const { Users } = require('@models')


class PostController {
  commentsService = new CommentsService();
  userService = new UserService();

  createPost = async (req, res) => {
    try {
      const { userId, nickname } = res.locals.user;
      const { dogname, title, content, lostLatitude, lostLongitude, losttime } = req.body;
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
          .status(401)
          .json({ message: "모든 필드의 값은 필수 값 입니다." });
      }
      if (!content) {
        return res
          .status(401)
          .json({ message: "모든 필드의 값은 필수 값 입니다." });
      }


      const postData = {
        dogname,
        UserId: userId,
        nickname,
        title,
        content,
        losttime,
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
    // const limit = 10;
    // const page = req.query.page ? req.query.page : 1;
    // const offset = (page - 1) * limit; // 페이지네이션
    const userId = res.locals.user ? res.locals.user.userId : null; // 로그인을 했을 때와 로그인을 하지 않았을 때의 사용자 구분

    const posts = await postService.getPosts(
      // limit, offset
      userId
    );

    res.status(200).json({ lostPostsData: posts });
  };

  getPostById = async (req, res) => {
    try {
      const { postId } = req.params;
      let post = await postService.getPostById(postId);
      const nickname = post.nickname;
      const data = await this.userService.findNickname(nickname);
      const userPhoto = data.userPhoto;
      result = []
      result.push(post)
      result.push(userPhoto)
      console.log("유저 데이터", data)
      console.log("사진 URL", userPhoto)
      post.userPhoto = userPhoto;
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
    }
  };

  updatePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content, dogname, losttime } = req.body;
      const { lostLatitude, lostLongitude } = req.body;
      const { lostPhotoUrl } = req;
      let address = await getAddress(lostLatitude, lostLongitude);
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
        losttime,
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