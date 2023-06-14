const RandomLostpostsRepository = require("../repositories/randomLostposts.repository");
const { Posts, Users, Sequelize } = require("../models");

class RandomLostpostsService {
    randomLostpostsRepository = new RandomLostpostsRepository(Posts, Users, Sequelize);

    getNearbyRandomPosts = async (userId) => {
        try {
            // 로그인을 하지 않은 유저는 전체 게시글 랜덤 조회
            if (!userId) {
                return await this.fetchAllPostsRandomly();
            }

            const userLocation = await this.randomLostpostsRepository.findUserLocation(userId); // 유저 위치정보 찾기. 위치정보 동의 했으면 유저 위치 있음.

            // 유저가 위치 정보를 동의하지 않았을 때 전체 게시글 랜덤 조회
            if (!userLocation) {
                return await this.fetchAllPostsRandomly();
            }

            const findNearbyPostsRandomly = await this.randomLostpostsRepository.findNearbyPostsRandomly(userId); // 유저의 현위치에서부터 가까운 게시글 순부터 조회

            // 5km 안에 등록된 게시글이 없을 때, 전체 게시글 랜덤 조회
            if (!findNearbyPostsRandomly || findNearbyPostsRandomly.length === 0) {
                return await this.fetchAllPostsRandomly();
            }

            // 5km 안에 등록된 게시글 랜덤 조회
            const results = await Promise.all(
                findNearbyPostsRandomly.map(async (item) => this.mapPost(item))
            );
            return results;
        } catch (error) {
            error.failedApi = "메인화면 댕파인더 조회"
            throw error;
        }
    }

    mapPost = (item) => {
        return {
            dogname: item.dogname,
            postId: item.postId,
            userId: item.userId,
            nickname: item.nickname,
            lostPhotoUrl: item.lostPhotoUrl,
            title: item.title,
            address: item.address,
            content: item.content,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            lostLatitude: item.lostLatitude,
            lostLongitude: item.lostLongitude,
        };
    }

    // 전체 게시글 랜덤 조회
    fetchAllPostsRandomly = async () => {
        const getAllPosts = await this.randomLostpostsRepository.getAllPosts();
        const results = await Promise.all(
            getAllPosts.map(async (item) => this.mapPost(item))
        );
        return results;
    }
}

module.exports = RandomLostpostsService;
