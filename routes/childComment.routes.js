const express = require('express');
const router = express.Router();

const ChildCommentController = require("../controllers/childComment.controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

const childCommentController = new ChildCommentController();

// 대댓글 생성
router.post("/:postId/comments/:commentId/childcomments", authMiddleware, childCommentController.createChildComment);

// 대댓글 조회
router.get("/:postId/comments/:commentId/childcomments", authMiddleware, childCommentController.readChildComments);

// 대댓글 삭제
router.delete("/:postId/comments/:commentId/childcomments/:childCommentId", authMiddleware, childCommentController.deleteChildComment);

module.exports = router;