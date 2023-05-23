const MypageService = require('../(2)services/mypage.service')

class myPagesController {
    mypagesService = new MypageService()

    getMyInfo = async (req, res) => {
        const { userId } = res.locals.user
        const getMyInfoData = await this.mypagesService.getMyInfo(userId)

        return res.staus(201).json({ getMyInfoData })
    };

}

module.exports = myPagesController;