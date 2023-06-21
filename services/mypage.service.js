const MypageRepository = require('@repositories/mypage.repository')
const { Users, Posts, BookMarks, Poos } = require("@models");

class myPagesService {
    mypageRepository = new MypageRepository(Users, Posts, BookMarks, Poos)

    getMyInfo = async (userId) => {
        try {
            const getMyInfoData = await this.mypageRepository.getMyInfo(userId)
            if (!userId) {
                throw new Error("401/마이페이지 권한이 없습니다.")
            }
            return getMyInfoData

        } catch (error) {
            error.failedApi = "내 프로필 조회";
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

        } catch (error) {
            error.failedApi = "내가 작성한 게시글 조회";
            throw error;
        }
    };

    getMyBookmark = async (userId) => {
        try {
            const getMyBookmark = await this.mypageRepository.getMyBookmark(userId)
            if (!userId) {
                throw new Error("401/마이페이지 권한이 없습니다.")
            }
            if (!getMyBookmark) {
                throw new Error("401/데이터가 존재하지 않습니다.")
            }
            return getMyBookmark.map((item) => {
                const { postId, title, content, lostPhotoUrl, createdAt, updatedAt } = item.Post;
                return {
                    postId,
                    title,
                    content,
                    lostPhotoUrl,
                    createdAt,
                    updatedAt
                };
            })

        } catch (error) {
            error.failedApi = "내가 북마크한 게시글 조회";
            throw error;
        }
    };


    getMyPoo = async (userId) => {
        try {
            const getMyPoo = await this.mypageRepository.getMyPoo(userId)
            if (!userId) {
                throw new Error("401/마이페이지 권한이 없습니다.")
            }

            return getMyPoo

        } catch (error) {
            error.failedApi = "내가 작성한 푸박스 조회";
            throw error;
        }
    };
}

module.exports = myPagesService;