
class PoosRepository {
    constructor(PoosModel, UsersModel, Sequelize, redisClient) {
        this.PoosModel = PoosModel;
        this.UsersModel = UsersModel;
        this.Sequelize = Sequelize;
        this.redisClient = redisClient
    }

    postPoo = async (userId, content, pooPhotoUrl, pooLatitude, pooLongitude, address) => {
        const postPoo = await this.PoosModel.create({
            UserId: userId,
            content,
            pooPhotoUrl,
            pooLatitude,
            pooLongitude,
            address
        })

        return postPoo
    };

    cashingPoo = async (originalUrl, DEFAULT_EXPIRATION, getPooAll) => {
        const postPoo = await this.redisClient.setEx(
            originalUrl,
            DEFAULT_EXPIRATION,
            JSON.stringify(getPooAll)
        )
        return postPoo
    };


    findAllPoo = async () => {
        return await this.PoosModel.findAll({
            include: [
                {
                    model: this.UsersModel,
                    attribues: ['userId'],
                },
            ],
            order: [["createdAt", "DESC"]] // 수정된 부분
        })
    }


    // 두 위치 사이의 거리를 미터 단위로 계산해주는 ST_Distance_Sphere SQL 함수
    distanceBetweenPooLocation = async (latitude, longitude) => {
        const nearbyPoos = await this.PoosModel.findAll({
            where: this.Sequelize.literal(`ST_Distance_Sphere(point(${longitude}, ${latitude}), point(pooLongitude, pooLatitude)) <= 30`) // 두 지점 사이의 거리가 30미터 이내인지 확인
        })
        return nearbyPoos
    }

}

module.exports = PoosRepository;