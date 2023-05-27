// const BookmarkService = require('../(2)services/bookmark.service')

// class bookmarksController {
//     bookmarksService = new BookmarkService()

//     //북마크 등록
//     postBookmark = async (req, res) => {
//         const { postId } = req.params
//         const { userId } = res.locals.user
//         const createBookmark = await this.bookmarksService.postBookmark(postId, userId)

//         return createBookmark
    //}

    // scrapExhibition = async (req, res, next) => {
    //     try {
    //       const { userEmail } = res.locals.user;

    //       const { exhibitionId } = await pkIdParamSchema
    //         .validateAsync(req.params)
    //         .catch((err) => {
    //           res.status(400).json({ message: err.message });
    //           throw Boom.badRequest(err.message);
    //         });

    //       const updateExhibitionScrap =
    //         await this.exhibitionService.updateExhibitionScrap(
    //           userEmail,
    //           exhibitionId
    //         );

    //       if (updateExhibitionScrap == "create") {
    //         return res
    //           .status(201)
    //           .json({ message: "해당 전시글을 스크랩 했습니다." });
    //       } else if (updateExhibitionScrap == "delete") {
    //         return res
    //           .status(201)
    //           .json({ message: "해당 전시글을 스크랩에서 제외했습니다." });
    //       }
    //     } catch (error) {
    //       next(error);
    //     }
    //   };





// }

// module.exports = bookmarksController;