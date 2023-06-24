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

            if (getMyBookmark.length === 0) {
                return res.status(201).json({ message: "데이터 없쩌" })
            }

            const result = await Promise.all(
                getMyBookmark.map(({ bookmarkId, Post: { dataValues: { postId, title, content, lostPhotoUrl, createdAt, updatedAt } } }) => ({
                    bookmarkId,
                    postId,
                    title,
                    content,
                    lostPhotoUrl,
                    createdAt,
                    updatedAt,
                }))
            );
            return result
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