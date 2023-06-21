const BookmarkService = require('@services/bookmark.service')

class BookmarkController {
    bookmarkService = new BookmarkService()

    postBookmark = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId } = req.params;
        const bookmark = await this.bookmarkService.createBookmark(userId, postId);
        return res.status(200).json(bookmark);
    }

    getBookmark = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId } = req.params;
        const bookmark = await this.bookmarkService.getBookmark(userId, postId);
        return res.status(200).json({ bookmarkData: bookmark })
    };
};

module.exports = BookmarkController;