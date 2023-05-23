const PooRepsitory = require('../(3)repositories/poo.repository')
const { Poo } = require("../models");

class poosService {
    poosRepository = new PooRepsitory(Poo)

    postPoo = async (req, res) => {
        try {
            const { title, content, image, pooLocation } = req.body
            const getMyInfoData = await this.poosService.postPoo(title, content, image, pooLocation)
            if (!userId) {
                throw new Error("403/마이페이지 권한이 없습니다.")
            }
            if (!getMyInfoData) {
                throw new Error("400/데이터가 존재하지 않습니다.")
            }
            return res.staus(201).json({ getMyInfoData })
        } catch (err) {
            console.error(err)
            throw new Error("400/에러 케이스에서 처리 할 수 없는 에러")
        }
    };

    getPoo = async (req, res) => {
        try {
            const getPooData = await this.poosRepository.getPoo()
            if (!userId) {
                throw new Error("403/마이페이지 권한이 없습니다.")
            }
            if (!getMyInfoData) {
                throw new Error("400/데이터가 존재하지 않습니다.")
            }

            return res.staus(201).json({ getPooData })
        } catch (err) {
            console.error(err)
            throw new Error("400/에러 케이스에서 처리 할 수 없는 에러")
        }

    };

}

module.exports = poosService;