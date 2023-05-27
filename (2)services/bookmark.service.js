// const BookmarkRepository = require('../(3)repositories/bookmark.repository')
// const Bookmark = require("../models/bookmarks")

// class bookmarksService {
//     bookmarkRepository = new BookmarkRepository(Bookmark)

//     postBookmark = async (postId, userId) => {

//         try {

//             const findPost = await this.postService.findOnePost(postId);
//             if (!findPost) {
//                 return ({ "message": "게시물이 존재하지 않습니다." });
//             }

//             const createBookmarkData = await this.bookmarkRepository.findOneLike(
//                 postId,
//                 userId
//             );

//             const postLikeIsZero = post.likes === 0;
//             if (createLikeData) {
//                 // 이미 좋아요가 달려있으면 좋아요 취소
//                 await this.likeService.deleteLike(post_id, user_id);
//                 await this.postService.minusPostLike(post_id);
//                 res.status(200).json({ message: "좋아요를 취소하였습니다." });
//             } else if (!createLikeData && postLikeIsZero) {
//                 // 좋아요 등록
//                 await this.likeService.createLike(post_id, user_id);
//                 await this.postService.plusPostLike(post_id);
//                 res.status(200).json({ message: "좋아요를 등록하였습니다." });
//             } else {
//                 // 좋아요 등록 불가능 (좋아요 개수가 0개인 경우)
//                 res.status(402).json({ message: "다시 시도해주세요." });
//             }
//         } catch (error) {
//             console.error(error); // 오류 메시지 출력

//             return res.status(400).json({ message: "좋아요 등록에 실패하였습니다." });
//         }





//     }

//     // updateExhibitionScrap = async (userEmail, exhibitionId) => {
//     //     const updateExhibitionScrap =
//     //       await this.exhibitionRepository.updateExhibitionScrap(
//     //         userEmail,
//     //         exhibitionId
//     //       );

//     //     if (
//     //       !updateExhibitionScrap === "create" ||
//     //       !updateExhibitionScrap === "delete"
//     //     ) {
//     //       throw Boom.notFound(
//     //         "스크랩 등록/취소에 실패했습니다. 해당 게시글이 존재하지 않거나 요청에 실패했습니다."
//     //       );
//     //     }

//     //     return updateExhibitionScrap;
//     //   };



// }

// module.exports = bookmarksService;