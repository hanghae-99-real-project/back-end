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


    updatePostById = async (dogname,postId, title, content, photoUrl,lostLatitude,lostLongitude) => {
        const date = new Date();
        await Posts.update(
            {
                dogname: dogname,
                title: title,
                content: content,
                updatedAt: date,
                photoUrl: photoUrl,
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

};

module.exports = PostRepository;
