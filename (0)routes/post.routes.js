const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PostController = require("../(1)controllers/posts.controller");
const postController = new PostController();
const uploadImage = require("../modules/s3.js");


//게시글 작성
router.post(
    "/",
    authMiddleware,
    uploadImage.single("image"),
    async (req, res) => {
        postController.createPost(req, res);
    }
);

router.get(
    "/",
    async (req, res) => {
        postController.getPosts(req, res);
    });


router.get(
    "/:postId",
    postController.getPostById
);

router.put(
    "/:postId",
    authMiddleware,
    uploadImage.single("image"),
    postController.updatePost
);

router.delete(
    "/:postId",
    authMiddleware,
    postController.deletePost
);

module.exports = router;
