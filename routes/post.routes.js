const express = require("express");
const router = express.Router();
const authMiddleware = require("@middlewares/auth-middleware");
const PostController = require("@controllers/posts.controller");
const postController = new PostController();
const uploadImage = require("@middlewares/post_s3.js");

router.post("/", authMiddleware, uploadImage.array("image", 5), postController.createPost)

router.get("/", postController.getRecentPosts);

router.get("/nearby", authMiddleware, postController.getNearbyPosts);

router.get("/:postId", postController.getPostById);

router.put("/:postId", authMiddleware, uploadImage.array("image", 5), postController.updatePost);

router.delete("/:postId", authMiddleware, postController.deletePost);

router.post("/end/:postId", authMiddleware, postController.endPost);


module.exports = router;
