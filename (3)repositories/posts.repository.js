const { Posts, Likes } = require('../models');
require('dotenv').config();


class PostRepository {

    async create(postData) {
        return await Posts.create(postData);
    };


    async getPosts() {
        return await Posts.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }

    findPostById = async (postId) => {
        await Posts.increment('views', { where: { postId } });
        const post = await Posts.findByPk(postId);
        return post;
    };


    updatePostById = async (postId, title, content, photoUrl) => {
        const date = new Date();
        await Posts.update(
            {
                title: title,
                content: content,
                updatedAt: date,
                photoUrl: photoUrl,
            },
            {
                where: { postId }
            }
        );
    };

    deletePostById = async (postId) => {
        await Posts.destroy({
            where: { postId }
        });
    };

};

module.exports = PostRepository;
