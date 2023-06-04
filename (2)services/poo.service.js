const PoosRepository = require('../(3)repositories/poo.repository')
const { Poos, Users } = require("../models");
const getAddress = require("../modules/kakao")
const redisClient = require("../modules/redisClient")
const DEFAULT_EXPIRATION = 3600

class PoosService {
    poosRepository = new PoosRepository(Poos, Users, redisClient)

    postPoo = async (userId, content, pooPhotoUrl, pooLatitude, pooLongitude, originalUrl) => {
        try {

            let address = await getAddress(pooLatitude, pooLongitude);
            if (!address) {
                address = `${pooLatitude}, ${pooLongitude}`
            }
            const postPooData = await this.poosRepository.postPoo(userId, content, pooPhotoUrl, pooLatitude, pooLongitude, address)
            const getPooAll = await this.poosRepository.findAllPoo()
            await redisClient.setEx(originalUrl, DEFAULT_EXPIRATION, JSON.stringify(getPooAll));
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
            console.error(err)
            throw new Error("400/에러 케이스에서 처리 할 수 없는 에러")
        }
    };

    getPoo = async (originalUrl) => {
        try {
            const getPooData = await this.poosRepository.findAllPoo()
            const getPooDataAll = await Promise.all(
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

            await redisClient.SETEX(originalUrl, DEFAULT_EXPIRATION, JSON.stringify(getPooDataAll))

            return getPooDataAll;


        } catch (error) {
            error.failedApi = "푸박스 조회에러";
            throw error;
        }

    };


    getPooDetail = async (pooId, originalUrl) => {
        try {
            const getPooData = await this.poosRepository.getPooDetail(pooId);

            if (!pooId) {
                throw new Error("403/푸박스를 찾을 수 없습니다.")
            }
            if (!getPooData) {
                throw new Error("403/등록된 푸박스가 없습니다.")
            }
            redisClient.SETEX(originalUrl, DEFAULT_EXPIRATION, JSON.stringify(getPooData))
            return getPooData
        } catch (error) {
            error.failedApi = "푸박스 상세조회";
            throw error;
        }

    };
}

module.exports = PoosService;