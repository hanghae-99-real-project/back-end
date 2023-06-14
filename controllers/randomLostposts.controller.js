const RandomLostpostsService = require("../services/randomLostposts.service");

class RandomLostpostsController {
  randomLostpostsService = new RandomLostpostsService();

  getNearbyRandomPosts = async (req, res, next) => {
    const userId = res.locals.user ? res.locals.user.userId : null; // 로그인을 했을 때와 로그인을 하지 않았을 때의 사용자 구분
    const posts = await this.randomLostpostsService.getNearbyRandomPosts(userId);
    return res.status(200).json({ lostPostsData: posts });
  }

}
module.exports = RandomLostpostsController;