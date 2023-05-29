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
        userLongitude,
        userLatitude,
        position,
        userPhoto,
        introduction,
        address
    ) => {
        const signupData = await this.usersModel.create({
            nickname,
            password,
            phoneNumber,
            position,
            userLongitude,
            userLatitude,
            userPhoto,
            introduction,
            address
        });
        return signupData;
    };


    deleteSignup = async (userId) => {
        await this.usersModel.destroy({
            where: { userId },
        });
        return;
    };


    login = async (phoneNumber) => {
        const loginUser = await this.usersModel.findOne({ where: { phoneNumber } });
        return loginUser;
    };


    authCodeSend = async (authcode, phoneNumber) => {
        const authCode = await redisClient.SETEX(phoneNumber, 180, authcode);
        return authCode
    };

    authCodeValidation = async (phoneNumber) => {
        const authCode = await redisClient.get(phoneNumber)
        return authCode
    };

}

module.exports = UserRepository;
