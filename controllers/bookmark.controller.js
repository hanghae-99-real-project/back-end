const BookmarkService = require('@services/bookmark.service')

class BookmarkController {
    bookmarkService = new BookmarkService()

    postBookmark = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId } = req.params
        const bookmark = await this.bookmarkService.createBookmark(userId, postId);
        res.status(200).json(bookmark)
    }

};

module.exports = BookmarkController;