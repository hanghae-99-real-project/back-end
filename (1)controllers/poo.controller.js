const PoosService = require('../(2)services/poo.service');

class PoosController {
    poosService = new PoosService()

    // 푸박스 등록
    postPoo = async (req, res) => {
        const { userId } = res.locals.user
        const { content, pooLatitude, pooLongitude } = req.body
        const { pooPhotoUrl } = req;
        const postPooData = await this.poosService.postPoo(userId, content, pooPhotoUrl, pooLatitude, pooLongitude)

        return res.status(201).json(postPooData)
    };

    // 푸박스 조회
    getPoo = async (req, res, next) => {
        const getPooData = await this.poosService.getPoo();

        return res.status(201).json({ getPooData })
    };

    getPooDetail = async (req, res, next) => {
        const { pooId } = req.params
        const getPooData = await this.poosService.getPooDetail(pooId);

        return res.status(201).json(getPooData)
    };

}

module.exports = PoosController;