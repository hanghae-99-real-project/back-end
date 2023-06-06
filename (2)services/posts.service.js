const PostRepository = require("../(3)repositories/posts.repository");
const { Posts } = require("../models");
const postRepository = new PostRepository();

class PostService {
    async createPost(postData) {
        console.log("postData:", postData);
        return await postRepository.create(postData);
    }

    async getPosts() {
        try {
            const posts = await postRepository.getPosts();
            const results = await Promise.all(
                posts.map(async (item) => {
                    const post = {
                        dogname: item.dogname,
                        postId: item.postId,
                        userId: item.userId,
                        nickname: item.nickname,
                        title: item.title,
                        content: item.content,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        lostLatitude: item.lostLatitude,
                        lostLongitude: item.lostLocation,
                    };

                    return post;
                })
            );
            return results;
        } catch (error) {
            return { error: true, message: error.message };
        }
    }


    getPostById = async (postId) => {
        const post = await postRepository.findPostById(postId);
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
        const post = await postRepository.findPostById(postId);

        if (!title || !content) {
            throw new Error("입력 값이 유효하지 않습니다.");
        }

        if (userId !== post.userId) {
            throw new Error("게시글 수정 권한이 없습니다.");
        }

        await postRepository.updatePostById(
            dogname,
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
        const post = await postRepository.findPostById(postId);

        if (!post) {
            throw new Error("게시글이 존재하지 않습니다.");
        }

        if (userId !== post.UserId) {
            throw new Error("게시글 삭제 권한이 없습니다.");
        }

        await postRepository.deletePostById(postId);
    };

    endPost = async (userId, postId) => {
        const post = await postRepository.findPostById(postId);

        if (!post) {
            throw new Error("게시글이 존재하지 않습니다.");
        }

        if (userId !== post.UserId) {
            throw new Error("게시글 삭제 권한이 없습니다.");
        }

        await postRepository.deletePostById(postId);
    };

}


module.exports = PostService;
