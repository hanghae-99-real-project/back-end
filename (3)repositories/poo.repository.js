

class poosService {
    constructor(poo, user) {
        this.poo = poo;
        this.user = user;
    }

    postPoo = async (userId, content, pooPhotoUrl, pooLatitude, pooLongitude, address) => {
        const postPoo = await this.poo.create({
            UserId: userId,
            content,
            pooPhotoUrl,
            pooLatitude,
            pooLongitude,
            address
        })

        return postPoo
    };


    findAllPoo = async () => {
        return await this.poo.findAll({
            include: [
                {
                    model: this.user,
                    attribues: ['userId'],
                },
            ],
            attributes: [
                "pooId",
                "UserId",
                "pooLatitude",
                "pooLongitude",
                "address",
                "createdAt",
                "updatedAt",
            ],
        })
    }


    getPooDetail = async (pooId) => {
        const getPooData = await this.poo.findOne(
            { where: { pooId } }
        );

        return getPooData
    };

}

module.exports = poosService;