const PostService = require("@services/posts.service");

class PostController {
  postService = new PostService();

  createPost = async (req, res) => {
    const { userId, nickname } = res.locals.user;
    const { dogname, title, content, lostLatitude, lostLongitude, losttime } = req.body;
    const { lostPhotoUrl } = req;
    const postData = {
      dogname, UserId: userId, nickname, title, content, losttime, lostPhotoUrl, lostLatitude, lostLongitude, views: 0, commentCount: 0, status: 0
    };
    const post = await this.postService.createPost(postData);
    return res.status(201).json(post);
  };

  getRecentPosts = async (req, res) => {
    const limit = 10;
    const page = Number(req.query.page)
    const offset = (page - 1) * limit;
    const posts = await this.postService.getRecentPosts(limit, offset);
    return res.status(200).json({ lostPostsData: posts });
  };

  getNearbyPosts = async (req, res) => {
    const { userId } = res.locals.user;
    const limit = 10;
    const page = Number(req.query.page)
    const offset = (page - 1) * limit;
    const posts = await this.postService.getNearbyPosts(userId, limit, offset);
    return res.status(200).json({ lostPostsData: posts });
  };

  // 게시글 상세조회
  getPostById = async (req, res) => {
    const { postId } = req.params;
    let post = await this.postService.getPostById(postId);
    return res.status(200).json(post);
  };

  updatePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content, dogname, lostLatitude, lostLongitude } = req.body;
    const { lostPhotoUrl } = req;
    const result = await this.postService.updatePost(dogname, userId, postId, title, content, lostPhotoUrl, lostLatitude, lostLongitude);
    return res.status(200).json(result);
  };

  deletePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const result = await this.postService.deletePost(userId, postId);
    return res.status(200).json(result);
  };

  endPost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const result = await this.postService.endPost(userId, postId);
    return res.status(200).json(result);
  };
}

module.exports = PostController;