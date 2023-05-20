const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();
const authMiddleware = require("../middlewares/auth-middleware");


module.exports = router;
