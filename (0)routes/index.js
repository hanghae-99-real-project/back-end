const express = require("express");
const router = express.Router();

const authRouter = require("./users.routes");
const childCommentRouter = require("./childComment.routes");
const commentRouter = require("./comment.routes");
const mypageRouter = require("./mypage.routes");
const pooRouter = require("./poo.routes");
const postRouter = require("./post.routes");
const searchRouter = require("./search.routes");
const notificationRouter = require("./notification.routes");
const reportRouter = require("./reportPoo.routes");
const bookMarkRouter = require("./bookmark.routes");
//const passportConfig = require('../passport');
//passportConfig(app);


router.use("/auth", [authRouter, mypageRouter, bookMarkRouter]);

router.use("/posts", [childCommentRouter, commentRouter, postRouter]);

router.use("/search", searchRouter);

router.use("/map/poo", pooRouter);

router.use("/notifications", notificationRouter);

router.use("/report", reportRouter);





module.exports = router;