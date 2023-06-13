const MypageRepository = require('../repositories/mypage.repository')
const { Users, Posts, BookMarks, Poos } = require("../models");

class myPagesService {
    //의존성주입
    mypageRepository = new MypageRepository(Users, Posts, BookMarks, Poos)

    getMyInfo = async (userId) => {
        try {
            const getMyInfoData = await this.mypageRepository.getMyInfo(userId)
            if (!userId) {
                throw new Error("403/마이페이지 권한이 없습니다.")
            }
            return getMyInfoData

        } catch (error) {
            error.failedApi = "조회 실패";
            throw error;
        }
    };

    getMyPost = async (userId) => {
        try {
            const getMyPostData = await this.mypageRepository.getMyPost(userId)
            if (!userId) {
                throw new Error("401/마이페이지 권한이 없습니다.")
            }
            if (!getMyPostData) {
                throw new Error("401/작성한 게시글이 존재하지 않습니다.")
            }
            return getMyPostData

        } catch (err) {
            console.error(err)
            throw new Error("500/ 예외처리")

        }
    };

    getMyBookmark = async (userId) => {
        try {
            const getMyBookmark = await this.mypageRepository.getMyBookmark(userId)
            if (!userId) {
                throw new Error("403/마이페이지 권한이 없습니다.")
            }
            if (!getMyBookmark) {
                throw new Error("400/데이터가 존재하지 않습니다.")
            }
            return getMyBookmark

        } catch (err) {
            console.error(err)
            throw new Error("500/ 예외처리")
        }
    };


    getMyPoo = async (userId) => {
        try {
            const getMyPoo = await this.mypageRepository.getMyPoo(userId)
            if (!userId) {
                throw new Error("403/마이페이지 권한이 없습니다.")
            }

            console.log(getMyPoo)
            console.log(getMyPoo.length)
            console.log(getMyPoo.length === 0)

            if (getMyPoo.length === 0) {
                throw new Error("403/작성한 푸박스가 없습니다.")
            }
            return getMyPoo

        } catch (error) {
            error.failedApi = "에러처리";
            throw error

        }
    };
}

module.exports = myPagesService;