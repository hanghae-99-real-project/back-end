const { Posts } = require("../models");

class myPagesRepository {
    constructor(Users) {
        this.Users = Users;
        this.Posts = Posts
    }

    getMyInfo = async (userId) => {
        const getMyInfoData = await this.Users.findOne({
            where: { userId },
            attributes: ["userId", "phoneNumber", "nickname", "userPhoto"],
        })
        return getMyInfoData
    };

    getMyPost = async (userId) => {
        const getMyPostData = await this.Posts.findAll({
            where: { userId },
            attributes: ["postId", "title", "content", "photoUrl", "lostLocation", "createdAt", "updatedAt"],
        })
        return getMyPostData
    };

    getMyBookmark = async (userId) => {
        const getMyBookmarData = await this.Posts.findAll({

        })
        return getMyBookmarData
    };


}

module.exports = myPagesRepository;