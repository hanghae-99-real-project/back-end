const MypageService = require('../services/mypage.service')

class myPagesController {
    mypagesService = new MypageService()

    getMyInfo = async (req, res) => {
        const { userId } = res.locals.user;
        const getMyInfoData = await this.mypagesService.getMyInfo(userId);

        return res.status(201).json(getMyInfoData);
    };


    getMyPost = async (req, res) => {
        const { userId } = res.locals.user
        const getMyPostData = await this.mypagesService.getMyPost(userId)

        return res.status(201).json({ mypagePosts: getMyPostData })
    };

    getMyBookmark = async (req, res) => {
        const { userId } = res.locals.user
        const getMyBookmarkData = await this.mypagesService.getMyBookmark(userId)

        return res.status(201).json({ getMyBookmarkData })
    };

    getMyPoo = async (req, res, next) => {
        const { userId } = res.locals.user
        const getMyPooData = await this.mypagesService.getMyPoo(userId, next)
        return res.status(201).json({ getMyPooData })
    };

}

module.exports = myPagesController;