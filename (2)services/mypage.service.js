const MypageRepository = require('../(3)repositories/mypage.repository')
const { Users } = require("../models");

class myPagesController {
    //의존성주입
    mypageRepository = new MypageRepository(Users)

    getMyInfo = async (userId) => {
        try {
            const getMyInfoData = await this.mypageRepository.getMyInfo(userId)
            if (!userId) {
                throw new Error("403/마이페이지 권한이 없습니다.")
            }
            if (!getMyInfoData) {
                throw new Error("400/데이터가 존재하지 않습니다.")
            }
            return getMyInfoData

        } catch (err) {
            console.error(err)
            throw new Error("500/ 예외처리")
        }
    };

}

module.exports = myPagesController;