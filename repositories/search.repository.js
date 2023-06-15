const { Op } = require("sequelize");

class SearchRepository {
    constructor(usersModel, postsModel, poosModel) {
        this.usersModel = usersModel;
        this.postsModel = postsModel
        this.poosModel = poosModel
    };

    // 닉네임 검색 유저 조회
    findNicknames = async (search) => {
        return await this.usersModel.findAll({
            where: {
                nickname: {
                    [Op.like]: `%${search}%`
                }
            }
        });
    };

    // 댕파인더 게시물 검색
    findPosts = async (search) => {
        return await this.postsModel.findAll({
            where: {
                [Op.or]: [
                    {
                        dogname: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        title: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        address: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            }
        });
    };

    // 푸박스 주소 검색
    findPoos = async (search) => {
        return await this.poosModel.findAll({
            where: {
                address: {
                    [Op.like]: `%${search}%`
                }
            }
        });
    };
};

module.exports = SearchRepository;