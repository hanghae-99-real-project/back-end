const PostService = require("../(2)services/posts.service");
const postService = new PostService();
const CommentsService = require("../(2)services/comment.service");

class PostController {
  commentsService = new CommentsService();

}

module.exports = PostController;
