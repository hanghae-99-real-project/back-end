

class PostRepository {
    constructor(postsModel, Sequelize, usersModel, bookMarksModel, redisClient) {
        this.postsModel = postsModel;
        this.Sequelize = Sequelize;
        this.usersModel = usersModel;
        this.bookMarksModel = bookMarksModel;
        this.redisClient = redisClient
    }

    createPost = async (postData) => {
        return await this.postsModel.create(postData);
    };


    getPosts = async () => {
        return await this.postsModel.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }

    findPostById = async (postId) => {
        await this.postsModel.increment('views', { where: { postId } });
        const post = await this.postsModel.findOne({
            where: { postId },
            include: [
                {
                    model: bookMarksModel,
                    attributes: ["isBookmarked"]
                }
            ]
        });
        return post;
    };


    updatePost = async (dogname, userId, postId, title, content, lostPhotoUrl, lostLatitude, lostLongitude, address) => {
        const date = new Date();
        await this.postsModel.update(
            {
                dogname: dogname,
                userId: userId,
                title: title,
                content: content,
                updatedAt: date,
                lostPhotoUrl: lostPhotoUrl,
                lostLatitude: lostLatitude,
                lostLongitude: lostLongitude,
                address: address
            },
            {
                where: { postId }
            }
        );
    };

    deletePostById = async (postId) => {
        await this.postsModel.destroy({
            where: { postId }
        });
    };

    endPost = async (postId) => {
        await this.postsModel.increment('status', { where: { postId } });
    };

    // 위치가 가까운 순으로 조회
    findNearbyPosts = async (userId) => {
        const user = await this.usersModel.findOne({ where: userId });
        const { userLatitude, userLongitude } = user

        return await this.postsModel.findAll({
            order: this.Sequelize.literal(`ST_Distance_Sphere(point(${userLongitude}, ${userLatitude}), point(lostLongitude, lostLatitude))`),
        })
    };

    // post를 조회하려는 유저의 위경도 찾기
    findUserLocation = async (userId) => {
        const result = await this.usersModel.findOne({
            where: {
                userId
            },
            attributes: ['position']
        })
        return result
    }

    cashingLostposts = async (originalUrl, DEFAULT_EXPIRATION, results) => {
        const postPoo = await this.redisClient.setEx(
            originalUrl,
            DEFAULT_EXPIRATION,
            JSON.stringify(results)
        )
        return postPoo
    }


};

module.exports = PostRepository;
