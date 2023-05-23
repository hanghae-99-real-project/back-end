const PooRepsitory = require('../(3)repositories/poo.repository')
const { Poo } = require("../models");

class poosService {
    poosRepository = new PooRepsitory(Poo)

    postPoo = async (req, res) => {

        const { title, content, image, pooLocation } = req.body
        const getMyInfoData = await this.poosService.postPoo(title, content, image, pooLocation)

        return res.staus(201).json({ getMyInfoData })
    };


    getPoo = async (req, res) => {
        const getPooData = await this.poosRepository.getPoo()

        try {

        } catch (error) {


        }
        return res.staus(201).json({ getPooData })
    };

}

module.exports = poosService;