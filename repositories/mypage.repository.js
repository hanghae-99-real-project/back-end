class myPagesRepository {
    constructor(UsersModel, PostsModel, BookMarksModel, PoosModel) {
        this.UsersModel = UsersModel;
        this.PostsModel = PostsModel;
        this.BookMarksModel = BookMarksModel;
        this.PoosModel = PoosModel;
    }

    getMyInfo = async (userId) => {
        const getMyInfoData = await this.UsersModel.findOne({
            where: { userId },
            attributes: ["userId", "phoneNumber", "nickname", "userPhoto", "position"],
        })
        return getMyInfoData
    };

    getMyPost = async (userId) => {
        const getMyPostData = await this.PostsModel.findAll({
            where: { UserId: userId },
            attributes: ["postId", "title", "content", "lostPhotoUrl", "createdAt", "updatedAt"],
        })
        return getMyPostData
    };

    getMyBookmark = async (userId) => {
        const getMyBookmarData = await this.BookMarksModel.findAll({
            where: { UserId: userId },
            attributes: ["bookmarkId"],
            include: [
                {
                    model: this.PostsModel,
                    attributes: ["postId", "title", "content", "lostPhotoUrl", "createdAt", "updatedAt"],

                }
            ]
        })
        return getMyBookmarData
    };


    getMyPoo = async (userId) => {
        const getMyPooData = await this.PoosModel.findAll({
            where: { UserId: userId }

        })
        return getMyPooData
    };


}

module.exports = myPagesRepository;