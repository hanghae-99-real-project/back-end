const SearchRepository = require("@repositories/search.repository.js");
const { Users, Posts, Poos } = require("@models");

class SearchService {
    searchRepository = new SearchRepository(Users, Posts, Poos);

    // 유저 검색
    searchUsers = async (search) => {
        try {
            if (!search || search === "" || typeof search !== "string") {
                throw new Error("419/검색어의 형식이 올바르지 않습니다.");
            };
            const userDetail = await this.searchRepository.findNicknames(search);

            const users = await Promise.all(
                userDetail.map(async (user) => {
                    return {
                        userId: user.userId,
                        nickname: user.nickname,
                        userPhoto: user.userPhoto,
                    };
                })
            );
            return { users }
        } catch (error) {
            error.failedApi = "유저 검색";
            throw error;
        }
    };

    // 실종 신고 게시물 검색
    searchPosts = async (search) => {
        try {
            if (!search || search === "" || typeof search !== "string") {
                throw new Error("419/검색어의 형식이 올바르지 않습니다.");
            };
            const postDetail = await this.searchRepository.findPosts(search);

            const posts = await Promise.all(
                postDetail.map(async (post) => {
                    return {
                        postId: post.postId,
                        title: post.title,
                        dogname: post.dogname,
                        lostPhotoUrl: post.lostPhotoUrl,
                        address: post.address,
                    };
                })
            );
            return { posts }
        } catch (error) {
            error.failedApi = "댕파인더 검색";
            throw error;
        }
    };

    // 푸박스 주소 검색
    searchPoobox = async (search) => {
        try {
            if (!search || search === "" || typeof search !== "string") {
                throw new Error("419/검색어의 형식이 올바르지 않습니다.");
            };
            const poosDetail = await this.searchRepository.findPoos(search);

            const poos = await Promise.all(
                poosDetail.map(async (poos) => {
                    return {
                        pooId: poos.pooId,
                        address: poos.address,
                    };
                })
            );
            return { poos }
        } catch (error) {
            error.failedApi = "푸박스 검색";
            throw error;
        }
    };
};

module.exports = SearchService;