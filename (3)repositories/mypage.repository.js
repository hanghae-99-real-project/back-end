const { Posts } = require("../models");

class myPagesController {
    constructor(Users) {
        this.Users = Users;
    }

    getMyInfo = async (userId) => {
        const getMyInfoData = await this.Users.findOne({
            where: { userId },
            attributes: ["userId", "email", "nickname", "userPhoto"],
            include: {
                model: Posts,
                attributes: ["postId", "title", "photoUrl", "createdAt"]
            }
        })
        return getMyInfoData
    };


}

module.exports = myPagesController;