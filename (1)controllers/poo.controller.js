const PooService = require('../(2)services/poo.service')

class poosController {
    poosService = new PooService()

    postPoo = async (req, res) => {
        const { userId } = res.locals.user
        const { title, content, image, pooLocation } = req.body
        const getMyInfoData = await this.poosService.postPoo(userId, title, content, image, pooLocation)

        return res.staus(201).json({ getMyInfoData })
    };

    getPoo = async (req, res) => {
        const getPooData = await this.poosService.getPoo()

        return res.staus(201).json({ getPooData })
    };

}

module.exports = poosController;