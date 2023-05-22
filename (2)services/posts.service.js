const PostRepository = require("../(3)repositories/posts.repository");
const { post } = require("../(0)routes");
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
        userId,
        postId,
        title,
        content,
        photoUrl
    ) => {
        const post = await postRepository.findPostById(postId);

        if (!title || !content ) {
            throw new Error("입력 값이 유효하지 않습니다.");
        }

        if (userId !== post.userId) {
            throw new Error("게시글 수정 권한이 없습니다.");
        }
    
        await postRepository.updatePostById(
            postId,
            title,
            content,
            photoUrl
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

}

module.exports = PostService;
