const PooRepsitory = require('../(3)repositories/poo.repository')
const { Poos, Users } = require("../models");
const getAddress = require("../modules/kakao")

class poosService {
    poosRepository = new PooRepsitory(Poos, Users)

    postPoo = async (userId, content, pooPhotoUrl, pooLatitude, pooLongitude) => {
        try {

            const address = await getAddress(pooLatitude, pooLongitude);
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
            console.error(err)
            throw new Error("400/에러 케이스에서 처리 할 수 없는 에러")
        }
    };

    getPoo = async () => {
        try {
            const getPooData = await this.poosRepository.findAllPoo()

            const response = await Promise.all(
                getPooData.map(async (poo) => {
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

            return response.sort((a, b) => b.createdAt - a.createdAt);
        } catch (error) {
            error.failedApi = "푸박스 조회";
            throw error;
        }
    };
}

module.exports = poosService;