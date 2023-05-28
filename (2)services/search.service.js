const SearchRepository = require("../(3)repositories/search.repository");
const { Users, Posts } = require("../models");

class SearchService {
    searchRepository = new SearchRepository(Users, Posts);

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
                    dogname: post.dogname,
                    title: post.title,
                    photoUrl: post.photoUrl,
                    address: post.address,
                };
            })
        );
        return { posts }
    };
};

module.exports = SearchService;