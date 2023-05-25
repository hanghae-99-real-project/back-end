const SearchService = require("../(2)services/search.service.js");

class SearchController {
    searchService = new SearchService();

    // 유저 검색
    searchUsers = async (req, res, next) => {
        try {
            const { search } = req.query;
            if (!search || search === "" || typeof search !== "string") {
                throw new Error("419/검색어의 형식이 올바르지 않습니다.");
            };

            const result = await this.searchService.searchUsers(search);

            res.status(200).json(result);
        } catch (error) {
            error.failedApi = "검색";
            throw error;
        }
    };

    // 실종 신고 게시물 검색
    searchPosts = async (req, res, next) => {
        try {
            const { search } = req.query;
            if (!search || search === "" || typeof search !== "string") {
                throw new Error("419/검색어의 형식이 올바르지 않습니다.");
            };

            const result = await this.searchService.searchPosts(search);

            res.status(200).json(result);
        } catch (error) {
            error.failedApi = "검색";
            throw error;
        }
    };
};

module.exports = SearchController;