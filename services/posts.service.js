const PostRepository = require("../repositories/posts.repository");
const { Posts, Users, Sequelize } = require('../models');

class PostService {
    postRepository = new PostRepository(Posts, Users, Sequelize);

    async createPost(postData) {
        return await this.postRepository.create(postData);
    }

    // async getPosts(
    //     // limit, offset
    //     userId
    // ) {
    //     try {
    //         const posts = await postRepository.getPosts(
    //             // limit, offset
    //         );
    //         const findNearbyPosts = await postRepository.findNearbyPosts(userId); // 유저의 현위치에서부터 가까운 게시글 순부터 조회
    //         const userLocation = await postRepository.findUserLocation(userId); // 유저 위치정보 찾기. 위치정보 동의 했으면 유저 위치 있음.
    //         if (userLocation) { // 만약 userlocation이 존재한다면 주변 반경 가까운 게시글 순부터 조회
    //             const results = await Promise.all(
    //                 findNearbyPosts.map(async (item) => {
    //                     const post = {
    //                         dogname: item.dogname,
    //                         postId: item.postId,
    //                         userId: item.userId,
    //                         nickname: item.nickname,
    //                         lostPhotoUrl: item.lostPhotoUrl,
    //                         title: item.title,
    //                         content: item.content,
    //                         createdAt: item.createdAt,
    //                         updatedAt: item.updatedAt,
    //                         lostLatitude: item.lostLatitude,
    //                         lostLongitude: item.lostLongitude,
    //                         // setDateTime: item.setDateTime,
    //                     };
    //                     return post;
    //                 })
    //             );
    //             return results;
    //         } else {
    //             const results = await Promise.all(
    //                 posts.map(async (item) => { // userlocation이 존재하지 않는다면 내림차순 조회
    //                     const post = {
    //                         dogname: item.dogname,
    //                         postId: item.postId,
    //                         userId: item.userId,
    //                         nickname: item.nickname,
    //                         lostPhotoUrl: item.lostPhotoUrl,
    //                         title: item.title,
    //                         content: item.content,
    //                         createdAt: item.createdAt,
    //                         updatedAt: item.updatedAt,
    //                         lostLatitude: item.lostLatitude,
    //                         lostLongitude: item.lostLongitude,
    //                         // setDateTime: item.setDateTime,
    //                     };
    //                     return post;
    //                 })
    //             );
    //             return results;
    //         }
    //     } catch (error) {
    //         error.failedApi = "댕파인더 조회";
    //         throw error
    //     }
    // }

    getPosts = async (userId) => {
        try {
            if (!userId) {
                return await this.getAllPostsRecently();
            }

            const userLocation = await this.postRepository.findUserLocation(userId); // 유저 위치정보 찾기. 위치정보 동의 했으면 유저 위치 있음.
            if (!userLocation.dataValues.position) {
                return await this.getAllPostsRecently();
            }

            const findNearbyPosts = await this.postRepository.findNearbyPosts(userId); // 유저의 현위치에서부터 가까운 게시글 순부터 조회
            const results = await Promise.all(
                findNearbyPosts.map(async (item) => this.mapPost(item))
            )
            return results
        } catch (error) {
            error.failedApi = "댕파인더 조회"
            throw error
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
            content: item.content,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            lostLatitude: item.lostLatitude,
            lostLongitude: item.lostLongitude,
        };
    }

    getAllPostsRecently = async () => {
        const posts = await this.postRepository.getPosts();
        const results = await Promise.all(
            posts.map(async (item) => this.mapPost(item))
        );
        return results
    }


    getPostById = async (postId) => {
        const post = await this.postRepository.findPostById(postId);
        return post;
    };

    updatePost = async (
        dogname,
        userId,
        postId,
        title,
        content,
        lostPhotoUrl,
        lostLatitude,
        lostLongitude,
        address
    ) => {
        const post = await this.postRepository.findPostById(postId);
        const UserId = userId

        if (!title || !content) {
            throw new Error("401/입력 값이 유효하지 않습니다.");
        }

        if (userId !== post.UserId) {
            throw new Error("401/게시글 수정 권한이 없습니다.");
        }

        await this.postRepository.updatePostById(
            dogname,
            UserId,
            postId,
            title,
            content,
            lostPhotoUrl,
            lostLatitude,
            lostLongitude,
            address
        );
    };

    deletePost = async (userId, postId) => {
        const post = await this.postRepository.findPostById(postId);

        if (!post) {
            throw new Error("401/게시글이 존재하지 않습니다.");
        }

        if (userId !== post.UserId) {
            throw new Error("401/게시글 삭제 권한이 없습니다.");
        }

        await this.postRepository.deletePostById(postId);
    };

    endPost = async (userId, postId) => {
        const post = await this.postRepository.findPostById(postId);

        if (!post) {
            throw new Error("401/게시글이 존재하지 않습니다.");
        }

        if (userId !== post.UserId) {
            throw new Error("401/게시글 삭제 권한이 없습니다.");
        }

        await this.postRepository.deletePostById(postId);
    };

}


module.exports = PostService;
