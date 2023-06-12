const BookmarkService = require('../services/bookmark.service')

class BookmarkController {
    bookmarkService = new BookmarkService()

    postBookmark = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { postId } = req.params

        const createBookmark = await this.bookmarkService.postBookmark(userId, postId);

        res.status(200).json(createBookmark)
    }

};

module.exports = BookmarkController;