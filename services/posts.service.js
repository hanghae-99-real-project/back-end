const PostRepository = require("@repositories/posts.repository");
const UserRepository = require("@repositories/Users.repository");
const getAddress = require("@modules/kakao")
const { Posts, Sequelize, Users, BookMarks } = require('@models');


class PostService {
    postRepository = new PostRepository(Posts, Sequelize, Users, BookMarks);
    userRepository = new UserRepository(Users);

    createPost = async (postData) => {
        try {
            let address = await getAddress(postData.lostLatitude, postData.lostLongitude);
            if (!address) {
                address = `${postData.lostLatitude}, ${postData.lostLongitude}`
            }
            if (!postData.title) {
                throw new Error("401/모든 필드의 값은 필수 값 입니다.");
            }
            if (!postData.content) {
                throw new Error("401/모든 필드의 값은 필수 값 입니다.");
            }

            postData.address = address
            await this.postRepository.createPost(postData);
            return { message: "게시글 작성에 성공하였습니다." }
        } catch (error) {
            error.failedApi = "게시글 작성"
            throw error
        }
    }

    getRandomPosts = async (limit, offset) => {
        try {
            const posts = await this.postRepository.getRandomPosts(limit, offset);
            const results = await Promise.all(
                posts.map(async (item) => this.mapPost(item))
            );
            return results
        } catch (error) {
            error.failedApi = "댕파인더 랜덤 조회"
            throw error
        }
    }

    getNearbyPosts = async (userId, limit, offset) => {
        try {
            if (userId === null) {
                throw new Error('403/댕파인더 가까운 순으로 조회를 하려면 로그인이 필요합니다.')
            }
            const userLocation = await this.postRepository.findUserLocation(userId);
            if (userLocation.dataValues.position === false || userLocation.dataValues.position === null) {
                throw new Error('401/유저 위치의 조회에 실패하였습니다.')
            }
            const findNearbyPosts = await this.postRepository.getNearbyPosts(userId, limit, offset);
            const results = await Promise.all(
                findNearbyPosts.map(async (item) => this.mapPost(item))
            )
            return results
        } catch (error) {
            error.failedApi = "댕파인더 가까운 순으로 조회"
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

    getPostById = async (postId) => {
        try {
            const post = await this.postRepository.findPostById(postId);

            const userId = post.UserId;
            const data = await this.userRepository.findbyid(userId);
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
