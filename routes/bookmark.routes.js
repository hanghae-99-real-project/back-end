const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const BookmarkController = require("../controllers/bookmark.controller");
const bookmarkController = new BookmarkController();

// 북마크 등록 취소
router.put("/:postId/bookmark", authMiddleware, bookmarkController.postBookmark);


module.exports = router;