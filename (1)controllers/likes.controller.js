const LikesService = require("../(2)services/likes.service");
const PostsService = require("../(2)services/posts.service");

class LikesController {
  likesService = new LikesService();
  postsService = new PostsService();

}

module.exports = LikesController;
