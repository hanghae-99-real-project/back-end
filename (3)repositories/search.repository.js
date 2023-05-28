const { Op } = require("sequelize");

class SearchRepository {
    constructor(usersModel, postsModel) {
        this.usersModel = usersModel;
        this.postsModel = postsModel
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

    // 게시물     // 실종 신고 게시물 검색

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

};

module.exports = SearchRepository;