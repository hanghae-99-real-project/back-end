

class poosService {
    constructor(Poo) {
        this.poo = Poo;
    }

    postPoo = async (req, res) => {

        const postPoo = await this.poo.create(title, content, image, pooLocation)

        return postPoo
    };


    getPoo = async (req, res) => {
        const getPooData = await this.poo.findAll()

        return getPooData
    };

}

module.exports = poosService;