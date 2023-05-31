const SearchRepository = require("../(3)repositories/search.repository");
const { Users, Posts, Poos } = require("../models");

class SearchService {
    searchRepository = new SearchRepository(Users, Posts, Poos);

    // 유저 검색
    searchUsers = async (search) => {
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
    };

    // 실종 신고 게시물 검색
    searchPosts = async (search) => {
        const postDetail = await this.searchRepository.findPosts(search);


        const posts = await Promise.all(
            postDetail.map(async (post) => {
                return {
                    postId: post.postId,
                    title: post.title,
                    lostPhotoUrl: post.lostPhotoUrl,
                    address: post.address,
                };
            })
        );
        return { posts }
    };

    // 푸박스 주소 검색
    searchPoobox = async (search) => {
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
    };
};

module.exports = SearchService;