class myPagesRepository {
    constructor(Users, Posts, BookMarks) {
        this.Users = Users;
        this.Posts = Posts;
        this.BookMarks = BookMarks;
    }

    getMyInfo = async (userId) => {
        const getMyInfoData = await this.Users.findOne({
            where: { userId },
            attributes: ["userId", "phoneNumber", "nickname", "userPhoto"],
        })
        return getMyInfoData
    };

    getMyPost = async (userId) => {
        const getMyPostData = await this.Posts.findAll({
            where: { UserId: userId },
            attributes: ["postId", "title", "content", "lostPhotoUrl", "createdAt", "updatedAt"],
        })
        return getMyPostData
    };

    getMyBookmark = async (userId) => {
        const getMyBookmarData = await this.BookMarks.findAll({
            where: { UserId: userId },
            attributes: ["bookmarkId"],
            include: [
                {
                    model: this.Posts,
                    attributes: ["postId", "title", "content", "lostPhotoUrl", "createdAt", "updatedAt"],

                }
            ]
        })
        return getMyBookmarData
    };


}
//1. 내가 북마크한 게시글을 모두조회
//2. userId = 1 , postId = 1 , 2 ,3  북마크추가
//3. BookMarks 테이블에서 존재하는 게시글모두  postId = 1,2 ,3  userId = 1

module.exports = myPagesRepository;