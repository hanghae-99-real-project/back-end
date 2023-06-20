const SearchService = require("@services/search.service.js");

class SearchController {
    searchService = new SearchService();

    // 유저 검색
    searchUsers = async (req, res, next) => {
        const { search } = req.query;
        const result = await this.searchService.searchUsers(search);
        return res.status(200).json(result);
    };

    // 실종 신고 게시물 검색
    searchPosts = async (req, res, next) => {
        const { search } = req.query;
        const result = await this.searchService.searchPosts(search);
        return res.status(200).json(result);
    };

    // 푸박스 주소 검색
    searchPoobox = async (req, res, next) => {
        const { search } = req.query;
        const result = await this.searchService.searchPoobox(search);
        return res.status(200).json(result);
    };
};

module.exports = SearchController;