const redisClient = require('../modules/redisClient');

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
        phoneNumber,
        userPhoto,
        // introduction
    ) => {
        const signupData = await this.usersModel.create({
            nickname,
            password,
            phoneNumber,
            userPhoto,
            // introduction,
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


    authCodeSend = async (authcode, phoneNum) => {
        const authCode = await redisClient.SETEX(phoneNum, 180, authcode);
        return authCode
    };

    authCodeVaildation = async (phoneNum) => {
        const authCode = await redisClient.get(phoneNum)
        return authCode
    };

}

module.exports = UserRepository;
