const LikesService = require("../services/likes.service");
const PostsService = require("../services/posts.service");

class LikesController {
  likesService = new LikesService();
  postsService = new PostsService();

}

module.exports = LikesController;
