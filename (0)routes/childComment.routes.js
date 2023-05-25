const express = require('express');
const router = express.Router();

const ChildCommentController = require("../(1)controllers/childComment.controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

const childCommentController = new ChildCommentController();

// 대댓글 생성
router.post("/:postId/comments/:commentId/childcomments", authMiddleware, childCommentController.createChildComment);

// 비밀 대댓글 생성
// router.post("/:postId/comments/:commentId/childcomments/secret", authMiddleware, childCommentController.createSecretChildComment);

// 대댓글 조회
router.get("/:postId/comments/:commentId/childcomments", authMiddleware, childCommentController.readChildComments);

// 비밀 대댓글 조회
// router.get("/:postId/comments/:commentId/childcomments/secret", authMiddleware, childCommentController.readSecretChildComments);

// 대댓글 삭제
router.delete("/:postId/comments/:commentId/childcomments/:childcommentId", authMiddleware, childCommentController.deleteChildComment);

module.exports = router;