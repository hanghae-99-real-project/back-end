const express = require("express");
const router = express.Router();

const authRouter = require("./auth.routes");
const postRouter = require("./post.routes");
const commentRouter = require("./comment.routes");
const likeRouter = require("./like.routes");
const mypage_router = require("./mypage.routes");


router.use("/auth", authRouter);
router.use("/posts", [postRouter, commentRouter, likeRouter]);
router.use("/auth/profile", mypage_router);

module.exports = router;
