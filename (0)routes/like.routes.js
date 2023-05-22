const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const LikesController = require("../(1)controllers/likes.controller");
const likesController = new LikesController();


module.exports = router;
