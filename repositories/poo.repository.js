const { Sequelize } = require("../models");


class PoosRepository {
    constructor(poo, user) {
        this.poo = poo;
        this.user = user;
    }

    postPoo = async (userId, content, pooPhotoUrl, pooLatitude, pooLongitude, address) => {
        const postPoo = await this.poo.create({
            UserId: userId,
            content,
            pooPhotoUrl,
            pooLatitude,
            pooLongitude,
            address
        })

        return postPoo
    };


    findAllPoo = async () => {
        return await this.poo.findAll({
            include: [
                {
                    model: this.user,
                    attribues: ['userId'],
                },
            ],
            order: [["createdAt", "DESC"]] // 수정된 부분
        })
    }


    // getPooDetail = async (pooId) => {
    //     const getPooData = await this.poo.findOne(
    //         { where: { pooId } }
    //     );

    //     return getPooData
    // };

    // 두 위치 사이의 거리를 미터 단위로 계산해주는 ST_Distance_Sphere SQL 함수
    distanceBetweenPooLocation = async (latitude, longitude) => {
        const nearbyPoos = await this.poo.findAll({
            where: Sequelize.literal(`ST_Distance_Sphere(point(${longitude}, ${latitude}), point(pooLongitude, pooLatitude)) <= 30`) //30미터
        })
        return nearbyPoos
    }

}

module.exports = PoosRepository;