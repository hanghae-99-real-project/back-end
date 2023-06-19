const PostRepository = require("@repositories/posts.repository");
const UserRepository = require("@repositories/users.repository");
const getAddress = require("@modules/kakao")
const { Posts, Sequelize, Users, BookMarks } = require('@models');
const redisClient = require("@modules/redisClient")
const DEFAULT_EXPIRATION = 3600

class PostService {
    postRepository = new PostRepository(Posts, Sequelize, Users, BookMarks, redisClient);
    userRepository = new UserRepository(Users);

    createPost = async (postData) => {
        try {
            let address = await getAddress(postData.lostLatitude, postData.lostLongitude);
            if (!address) {
                address = `${postData.lostLatitude}, ${postData.lostLongitude}`
            }
            if (!postData.title) {
                return res.status(401).json({ message: "모든 필드의 값은 필수 값 입니다." });
            }
            if (!postData.content) {
                return res.status(401).json({ message: "모든 필드의 값은 필수 값 입니다." });
            }

            postData.address = address
            await this.postRepository.createPost(postData);
            return { message: "게시글 작성에 성공하였습니다." }
        } catch (error) {
            error.failedApi = "게시글 작성"
            throw error
        }
    }

    getPosts = async (userId, limit, offset) => {
        try {
            if (!userId) {
                return await this.getAllPostsRecently(limit, offset);
            }

            const userLocation = await this.postRepository.findUserLocation(userId);
            if (userLocation === false) {
                return await this.getAllPostsRecently(limit, offset);
            }

            const findNearbyPosts = await this.postRepository.findNearbyPosts(userId, limit, offset);
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
            status: item.status,
            content: item.content,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            lostLatitude: item.lostLatitude,
            lostLongitude: item.lostLongitude,
        };
    }

    getAllPostsRecently = async (limit, offset) => {
        const posts = await this.postRepository.getPosts(limit, offset);
        const results = await Promise.all(
            posts.map(async (item) => this.mapPost(item))
        );
        return results
    }

    getPostById = async (postId) => {
        try {
            const post = await this.postRepository.findPostById(postId);

            const nickname = post.nickname;
            const data = await this.userRepository.findNickname(nickname);
            const userPhoto = data.userPhoto;
            let result = []
            result.push(post)
            result.push(userPhoto)
            post.userPhoto = userPhoto;

            return result;
        } catch (error) {
            error.failedApi = "게시글 상세 조회"
            throw error
        }
    };

    updatePost = async (dogname, userId, postId, title, content, lostPhotoUrl, lostLatitude, lostLongitude) => {
        try {
            const post = await this.postRepository.findPostById(postId);
            const UserId = userId

            let address = await getAddress(lostLatitude, lostLongitude);
            if (!address) {
                address = `${lostLatitude}, ${lostLongitude}`
            }
            if (!title || !content) {
                throw new Error("401/입력 값이 유효하지 않습니다.");
            }

            if (userId !== post.UserId) {
                throw new Error("401/게시글 수정 권한이 없습니다.");
            }


            await this.postRepository.updatePost(dogname, UserId, postId, title, content, lostPhotoUrl, lostLatitude, lostLongitude, address);
            return { message: "게시글을 수정하였습니다." }
        } catch (error) {
            error.failedApi = "게시글 수정"
            throw error
        }
    };

    deletePost = async (userId, postId) => {
        try {
            const post = await this.postRepository.findPostById(postId);
            if (!post) {
                throw new Error("401/게시글이 존재하지 않습니다.");
            }
            if (userId !== post.UserId) {
                throw new Error("401/게시글 삭제 권한이 없습니다.");
            }
            await this.postRepository.deletePostById(postId);
            return { message: "게시글을 삭제하였습니다." }
        } catch (error) {
            error.failedApi = "게시글 삭제"
            throw error
        }
    };

    endPost = async (userId, postId) => {
        try {
            const post = await this.postRepository.findPostById(postId);

            if (!post) {
                throw new Error("401/게시글이 존재하지 않습니다.");
            }

            if (userId !== post.UserId) {
                throw new Error("401/게시글 변경 권한이 없습니다.");
            }
            await this.postRepository.endPost(postId);
            return { message: "게시글 상태 변경이 완료되었습니다." }
        } catch (error) {
            error.failedApi = "게시글 상태변경"
            throw error
        }
    };

}


module.exports = PostService;
