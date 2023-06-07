const { Posts, Likes } = require('../models');
require('dotenv').config();


class PostRepository {

    async create(postData) {
        return await Posts.create(postData);
    };


    async getPosts(
        // limit, offset
    ) {
        return await Posts.findAll({
            // limit: limit,
            // offset: offset,
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


    updatePostById = async (dogname, postId, title, content, lostPhotoUrl, lostLatitude, lostLongitude) => {
        const date = new Date();
        await Posts.update(
            {
                dogname: dogname,
                title: title,
                content: content,
                updatedAt: date,
                lostPhotoUrl: lostPhotoUrl,
                lostLatitude: lostLatitude,
                lostLongitude: lostLongitude,
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

    endPost = async (postId) => {
        await Posts.increment('status', { where: { postId } });
    };

};

module.exports = PostRepository;
