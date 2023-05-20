const PostService = require("../services/posts.service");
const postService = new PostService();
const CommentsService = require("../services/comments.service");

class PostController {
  commentsService = new CommentsService();

}

module.exports = PostController;
