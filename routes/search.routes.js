const express = require("express");
const router = express.Router();

const SearchController = require("@controllers/search.controller");
const authMiddleware = require("@middlewares/auth-middleware");

const searchController = new SearchController();

// 유저 검색 기능
router.get("/users",
    // authMiddleware,
    searchController.searchUsers);

// 실종 신고 게시물 검색 기능
router.get("/lostposts",
    // authMiddleware, 
    searchController.searchPosts)

// 푸박스 주소 검색
router.get("/poos",
    // authMiddleware, 
    searchController.searchPoobox)

module.exports = router;