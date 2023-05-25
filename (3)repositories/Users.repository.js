class UserRepository {
    constructor(UsersModel) {
        this.usersModel = UsersModel;
    }


    findNickname = async (nickname) => {
        const existNickname = await this.usersModel.findOne({
            where: { nickname },
        });
        return existNickname;
    };

    signup = async (
        nickname,
        password,
        email,
        photoUrl,
        introduction
    ) => {
        const signupData = await this.usersModel.create({
            nickname,
            password,
            email,
            photoUrl,
            introduction,
        });
        return signupData;
    };


    deleteSignup = async (userId) => {
        await this.usersModel.destroy({
            where: { userId },
        });
        return;
    };
    

    login = async (nickname) => {
        const loginUser = await this.usersModel.findOne({ where: { nickname } });
        return loginUser;
    };

}

module.exports = UserRepository;
