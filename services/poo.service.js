const PoosRepository = require('@repositories/poo.repository')
const { Poos, Users, Sequelize } = require("@models");
const getAddress = require("@modules/kakao")
const redisClient = require("@modules/redisClient")
const DEFAULT_EXPIRATION = 3600

class PoosService {
    poosRepository = new PoosRepository(Poos, Users, Sequelize, redisClient)

    postPoo = async (userId, content, pooPhotoUrl, pooLatitude, pooLongitude, originalUrl) => {
        try {
            const nearbyPoos = await this.poosRepository.distanceBetweenPooLocation(pooLatitude, pooLongitude);
            if (nearbyPoos.length > 0) { // 30미터 이내에 푸박스가 있는지 확인하는 조건문
                throw new Error("403/등록하려는 푸박스가 이미 등록된 푸박스인지 확인해주세요.")
            }

            let address = await getAddress(pooLatitude, pooLongitude);
            if (!address) {
                address = `${pooLatitude}, ${pooLongitude}`
            }

            if (!userId) {
                throw new Error("401/마이페이지 권한이 없습니다.")
            }
            if (!content) {
                throw new Error("401/입력된 설명이 존재하지 않습니다.")
            }
            if (!pooPhotoUrl) {
                throw new Error("401/사진이 등록되지 않았습니다.")
            }
            if (!pooLatitude) {
                throw new Error("401/경도가 입력되지 않았습니다.")
            }
            if (!pooLongitude) {
                throw new Error("401/위도가 입력되지 않았습니다.")
            }
            await this.poosRepository.postPoo(userId, content, pooPhotoUrl, pooLatitude, pooLongitude, address)
            const getPooAll = await this.poosRepository.findAllPoo()
            await this.poosRepository.cashingPoo(originalUrl, DEFAULT_EXPIRATION, getPooAll)
            return { message: "푸박스 등록 성공" }
        } catch (error) {
            error.failedApi = "푸박스 등록";
            throw error
        }

    };
    findAllPoo = async (originalUrl) => {
        try {
            const getPooData = await this.poosRepository.findAllPoo()
            const getPooDataAll = await Promise.all(
                getPooData.map((poo) => {
                    return {
                        pooId: poo.pooId,
                        UserId: poo.UserId,
                        content: poo.content,
                        pooPhotoUrl: poo.pooPhotoUrl,
                        pooLatitude: poo.pooLatitude,
                        pooLongitude: poo.pooLongitude,
                        address: poo.address,
                        createdAt: poo.createdAt,
                        updatedAt: poo.updatedAt,
                    };
                })
            )

            await this.poosRepository.cashingPoo(originalUrl, DEFAULT_EXPIRATION, getPooDataAll)
            return getPooDataAll;
        } catch (error) {
            error.failedApi = "푸박스 조회";
            throw error;
        }
    };

}

module.exports = PoosService;