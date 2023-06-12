const PoosService = require('../services/poo.service');

class PoosController {
    poosService = new PoosService()

    // 푸박스 등록
    postPoo = async (req, res, next) => {
        const { userId } = res.locals.user
        const { content, pooLatitude, pooLongitude } = req.body
        const { pooPhotoUrl } = req
        const originalUrl = req.originalUrl
        const postPooData = await this.poosService.postPoo(userId, content, pooPhotoUrl, pooLatitude, pooLongitude, originalUrl)
        res.status(200).json(postPooData)
    };

    // 푸박스 조회
    getPoo = async (req, res, next) => {
        const originalUrl = req.originalUrl
        const getPooData = await this.poosService.getPoo(originalUrl);
        return res.status(201).json({ getPooData })
    };

}

module.exports = PoosController;