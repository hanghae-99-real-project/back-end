// const { model } = require('mongoose');
const { Posts, Users, BookMarks, Sequelize } = require('../models');
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
        const post = await Posts.findOne({
            where: { postId },
            include: [
                {
                    model: BookMarks,
                    attributes: ["isBookmarked"]
                }
            ]
        });
        console.log(post)
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

    // 위치가 가까운 순으로 조회
    findNearbyPosts = async (userId) => {
        const user = await Users.findOne({ where: userId });
        const { userLatitude, userLongitude } = user

        return await Posts.findAll({
            order: Sequelize.literal(`ST_Distance_Sphere(point(${userLongitude}, ${userLatitude}), point(lostLongitude, lostLatitude))`),
        })
    };


    // user 위경도 찾기
    findUserLocation = async (userId) => {
        return await Users.findOne({
            where: {
                UserId: userId
            },
            attributes: ['userLongitude', 'userLatitude',]
        })
    }

};

module.exports = PostRepository;
