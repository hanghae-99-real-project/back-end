const redisClient = require('../modules/redisClient');
const { Users } = require('../models');

const bcrypt = require("bcrypt");

class UserRepository {
    constructor(UsersModel, UserDaosModel) {
        this.usersModel = UsersModel;
        this.userDaosModel = UserDaosModel;
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
        position,
        userPhoto
    ) => {
        const signupData = await this.usersModel.create({
            nickname,
            password,
            phoneNumber,
            position,
            userPhoto,
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

    findId = async (nickname) => {
        const loginUser = await this.userDaosModel.findOne({ where: { nickname } });
        return loginUser;
    };

    updateuserById = async (userId, hashedPassword, nickname, userPhoto) => {
        await Users.update(
            {
                passward : hashedPassword,
                nickname: nickname,
                userPhoto: userPhoto,
            },
            {
                where: { userId }
            }
        );
    };


}

module.exports = UserRepository;
