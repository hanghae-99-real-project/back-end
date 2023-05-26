const express = require("express");
const router = express.Router();

const authRouter = require("./users.routes");
const childCommentRouter = require("./childComment.routes");
const commentRouter = require("./comment.routes");
const likeRouter = require("./like.routes");
const mypageRouter = require("./mypage.routes");
const pooRouter = require("./poo.routes");
const postRouter = require("./post.routes");
const searchRouter = require("./search.routes");
//const passportConfig = require('../passport');
//passportConfig(app);


router.use("/auth", [authRouter, mypageRouter]);

router.use("/posts", [childCommentRouter, commentRouter, postRouter]);

router.use("/search", searchRouter);

router.use("/map/poo", pooRouter)

module.exports = router;