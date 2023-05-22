const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PostController = require("../(1)controllers/posts.controller");
const postController = new PostController();
const uploadImage = require("../modules/s3.js");


module.exports = router;
