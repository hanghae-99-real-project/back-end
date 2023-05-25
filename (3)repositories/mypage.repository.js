const { Posts } = require("../models");

class myPagesRepository {
    constructor(Users) {
        this.Users = Users;
    }

    getMyInfo = async (userId) => {
        const getMyInfoData = await this.Users.findOne({
            where: { userId },
            attributes: ["userId", "email", "nickname", "photoUrl"],
            include: {
                model: Posts,
                attributes: ["postId", "title", "content", "photoUrl", "createdAt"]
            }
        })
        return getMyInfoData
    };

    getMyPost = async (userId) => {
        const getMyBookmark = await Bookmarks.findAll({
            where: { userId },
            include: [Posts],
        });
        return getMyBookmark
    };

    getMyBookmark = async (userId) => {
        const getMyInfoData = await this.Posts.findAll({

        })
        return getMyInfoData
    };


}

module.exports = myPagesRepository;