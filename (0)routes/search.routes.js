const express = require("express");
const router = express.Router();

const SearchController = require("../(1)controllers/search.controller");
const authMiddleware = require("../middlewares/auth-middleware");

const searchController = new SearchController();

// 유저 검색 기능
router.get("/users",
    // authMiddleware,
    searchController.searchUsers);

// 게시물 검색 기능
router.get("/posts",
    // authMiddleware, 
    searchController.searchPosts)

module.exports = router;