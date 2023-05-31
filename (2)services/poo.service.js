const PoosRepository = require('../(3)repositories/poo.repository')
const { Poos, Users } = require("../models");
const getAddress = require("../modules/kakao")
const redisClient = require("../modules/redisClient")
const DEFAULT_EXPIRATION = 3600

class PoosService {
    poosRepository = new PoosRepository(Poos, Users, redisClient)

    postPoo = async (userId, content, pooPhotoUrl, pooLatitude, pooLongitude) => {
        try {

            const address = await getAddress(pooLatitude, pooLongitude);
            if (!address) {
                address = `${pooLatitude}, ${pooLongitude}`
            }
            const postPooData = await this.poosRepository.postPoo(userId, content, pooPhotoUrl, pooLatitude, pooLongitude, address)

            if (!userId) {
                throw new Error("403/마이페이지 권한이 없습니다.")
            }
            if (!content) {
                throw new Error("403/입력된 설명이 존재하지 않습니다.")
            }
            if (!pooPhotoUrl) {
                throw new Error("403/사진이 등록되지 않았습니다.")
            }
            if (!pooLatitude) {
                throw new Error("403/경도가 입력되지 않았습니다.")
            }
            if (!pooLongitude) {
                throw new Error("403/위도가 입력되지 않았습니다.")
            }
            return { "msg": "푸박스 등록 성공" }
        } catch (err) {
            return console.error(err)
        }
    };

    getPoo = async () => {
        try {
            const getPooBoxAll = await redisClient.get('pooBoxAll')
            console.log(getPooBoxAll)
            if (getPooBoxAll) {
                console.log('Cashe Hit')
                return (JSON.parse(getPooBoxAll))
            } else {
                console.log('Cashe Miss')
                const getPooData = await this.poosRepository.findAllPoo()
                const response = await Promise.all(
                    getPooData.map((poo) => {
                        return {
                            pooId: poo.pooId,
                            UserId: poo.UserId,
                            pooLatitude: poo.pooLatitude,
                            pooLongitude: poo.pooLongitude,
                            address: poo.address,
                            createdAt: poo.createdAt,
                            updatedAt: poo.updatedAt,
                        };
                    })
                )
                response.sort((a, b) => b.createdAt - a.createdAt);
                redisClient.SETEX('pooBoxAll', DEFAULT_EXPIRATION, JSON.stringify(response))
                return response;
            }
        } catch (error) {
            error.failedApi = "푸박스 조회";
            throw error;
        }

    };


    getPooDetail = async (pooId) => {
        try {
            const getPooData = await this.poosRepository.getPooDetail(pooId);

            if (!pooId) {
                throw new Error("403/푸박스를 찾을 수 없습니다.")
            }
            if (!getPooData) {
                throw new Error("403/등록된 푸박스가 없습니다.")
            }
            return getPooData
        } catch (error) {
            error.failedApi = "푸박스 상세조회";
            throw error;
        }

    };
}

module.exports = PoosService;