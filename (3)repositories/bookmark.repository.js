class BookmarkRepository {
    constructor(bookMarksModel, postsModel) {
        this.bookMarksModel = bookMarksModel;
        this.postsModel = postsModel
    };

    // 게시글 한 개 조회
    findPostById = async (postId) => {
        return await this.postsModel.findOne({
            where: { PostId: postId },
        });
    };

    findBookmark = async (userId, postId) => {
        const findOneBookrmark = await this.bookMarksModel.findOne(
            {
                where: {
                    UserId: userId,
                    PostId: postId
                }
            }
        )
        return findOneBookrmark
    }


    postBookmark = async (userId, postId) => {
        const createBookmark = await this.bookMarksModel.create({ UserId: userId, PostId: postId })
        return createBookmark
    }




    cancelBookmark = async (userId, postId) => {
        const destroyBookmark = await this.bookMarksModel.destroy(
            {
                where: { UserId: userId, PostId: postId }
            }
        )
        return destroyBookmark
    }



};

module.exports = BookmarkRepository;