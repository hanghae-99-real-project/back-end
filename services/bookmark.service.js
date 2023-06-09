const BookmarkRepository = require('@repositories/bookmark.repository')
const { BookMarks, Posts } = require("@models")

class bookmarkService {
    bookmarkRepository = new BookmarkRepository(BookMarks, Posts)

    createBookmark = async (userId, postId) => {
        try {
            const getExistPost = await this.bookmarkRepository.findPostById(postId);
            if (!getExistPost) {
                throw new Error("401/게시물이 존재하지 않습니다.")
            }
            const findBookmark = await this.bookmarkRepository.findBookmark(userId, postId);
            if (!findBookmark) {
                await this.bookmarkRepository.createBookmark(userId, postId);
                return { message: "게시글 북마크를 등록했습니다." }
            } else {
                await this.bookmarkRepository.cancelBookmark(userId, postId);
                return { message: "게시글 북마크를 취소했습니다." }
            }
        } catch (error) {
            error.failedApi = "북마크 등록";
            throw error
        }
    }

    getBookmark = async (userId, postId) => {
        try {
            const bookmark = await this.bookmarkRepository.getBookmark(userId, postId)
            return bookmark
        } catch (error) {
            error.failedApi = "북마크 조회";
            throw error
        }
    }

}

module.exports = bookmarkService;