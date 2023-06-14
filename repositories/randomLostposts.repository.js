

class RandomLostpostsRepository {
    constructor(postsModel, usersModel, Sequelize) {
        this.postsModel = postsModel;
        this.userModel = usersModel
        this.Sequelize = Sequelize
    };

    // 게시글 랜덤 조회
    getAllPosts = async () => {
        return await this.postsModel.findAll({
            order: this.Sequelize.literal("RAND()"),
            limit: 10
        });
    };

    // 5km 이내 게시글 랜덤 조회
    findNearbyPostsRandomly = async (userId) => {
        const user = await this.userModel.findOne({ where: userId });
        const { userLatitude, userLongitude } = user

        return await this.postsModel.findAll({
            where: this.Sequelize.literal(`ST_Distance_Sphere(point(${userLongitude}, ${userLatitude}), point(lostLongitude, lostLatitude)) <= 5000`),
            order: this.Sequelize.literal("RAND()"),
            limit: 10
        })
    };

    // post를 조회하려는 유저의 위경도 찾기
    findUserLocation = async (userId) => {
        const result = await this.userModel.findOne({
            where: {
                userId
            },
            attributes: ['userLongitude', 'userLatitude',]
        })
        return result
    }

};

module.exports = RandomLostpostsRepository;
