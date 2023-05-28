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
                        like: item.like,
                        views: item.views,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        photoUrl: item.photoUrl,
                        commentCount: null,
                        lostLatitude: item.lostLatitude,
                        lostLongitude: item.lostLocation
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
        photoUrl,
        lostLatitude,
        lostLongitude,
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
            photoUrl,
            lostLatitude,
            lostLongitude,
        );
    };

    deletePost = async (userId, postId) => {
        const post = await postRepository.findPostById(postId);

        if (!post) {
            throw new Error("게시글이 존재하지 않습니다.");
        }

        if (userId !== post.userId) {
            throw new Error("게시글 삭제 권한이 없습니다.");
        }

        await postRepository.deletePostById(postId);
    };

    // createSamplePost = async () => {
    //     try {
    //         const postData = {
    //             UserId: 1,
    //             dogname: '메이',
    //             title: '귀요미 잃어버렸어요',
    //             content: '귀요미 분 계실까요?',
    //             photoUrl: 'https://example.com/dogPhoto.jpg'
    //         };

    //         const post = await postRepository.create(postData);
    //         console.log('Post created:', post);
    //         return post;
    //     } catch (error) {
    //         console.error('Error creating post:', error);
    //     }
    // };

}
// const postService = new PostService();
// postService.createSamplePost();

module.exports = PostService;
