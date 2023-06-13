const redisClient = require('../modules/redisClient');
const { Users, UserDaos } = require('../models');

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

    signupkakao = async (
        datata,
        nicknamee,
        userPhotoo
    ) => {
        console.log("레퍼지 이메일",datata)
        console.log("레퍼지 닉네임",nicknamee)
        console.log("레퍼지 유저포토",userPhotoo)

        const { nickname, userPhoto } = datata
        const {email} = datata.email

        console.log("다시담은 레퍼지 이메일",email)
        console.log("다시담은 레퍼지 닉네임",nickname)
        console.log("다시담은 레퍼지 유저포토",userPhoto)
        const signupData = await this.usersModel.create({
            email,
            nickname,
            userPhoto
        });
        return signupData;
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

    loginkakao = async (email) => {
        const loginUser = await this.usersModel.findOne({ where: { email } });
        return loginUser;
    };


}

module.exports = UserRepository;
