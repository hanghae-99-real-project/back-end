

class poosService {
    constructor(poo, user) {
        this.poo = poo;
        this.user = user;
    }

    postPoo = async (userId, content, pooPhotoUrl, pooLatitude, pooLongitude) => {
        const postPoo = await this.poo.create({
            UserId: userId,
            content,
            pooPhotoUrl,
            pooLatitude,
            pooLongitude,
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
                "createdAt",
                "updatedAt",
            ],
        })
    }

}

module.exports = poosService;