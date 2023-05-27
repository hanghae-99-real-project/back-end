const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
// const BookmarkController = require("../(1)controllers/bookmark.controller");
// const bookmarkController = new BookmarkController();


//게시글 작성
//router.post("/:postId/bookmark", authMiddleware, bookmarkController.postBookmark);


module.exports = router;