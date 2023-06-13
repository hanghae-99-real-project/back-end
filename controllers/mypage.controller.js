const MypageService = require('../services/mypage.service')


class myPagesController {
    mypagesService = new MypageService()
    constructor(myLostPost = 0, myBookmark = 0, myPooPost = 0) {
        this.myLostPost = myLostPost; // 변수 선언 및 초기화
        this.myBookmark = myBookmark; // 변수 선언 및 초기화
        this.myPooPost = myPooPost; // 변수 선언 및 초기화
    }


    getMyInfo = async (req, res) => {
        const { userId } = res.locals.user;
        const getMyInfoData = await this.mypagesService.getMyInfo(userId);
        const getMyPooData = await this.mypagesService.getMyPoo(userId)
        const getMyBookmarkData = await this.mypagesService.getMyBookmark(userId)
        const getMyPostData = await this.mypagesService.getMyPost(userId)
        const mypageContent = []
        mypageContent.push(getMyPooData.length)
        mypageContent.push(getMyPostData.length)
        mypageContent.push(getMyBookmarkData.length)
        return res.status(201).json({ getMyInfoData, mypageContent });
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
        const getMyPooData = await this.mypagesService.getMyPoo(userId)
        return res.status(201).json({ getMyPooData })
    };




}

module.exports = myPagesController;