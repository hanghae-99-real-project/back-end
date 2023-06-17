const redisClient = require('@modules/redisClient');
const { Users, UserDaos } = require('@models');

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
        if (userPhoto === null || userPhoto.length === 0) {
            const randomUrls = [
                'https://karyl.s3.ap-northeast-2.amazonaws.com/folder/KakaoTalk_20230616_144459289.png',
                'https://karyl.s3.ap-northeast-2.amazonaws.com/folder/KakaoTalk_20230616_144459289_01.png',
                'https://karyl.s3.ap-northeast-2.amazonaws.com/folder/KakaoTalk_20230616_144459289_02.png',
                'https://karyl.s3.ap-northeast-2.amazonaws.com/folder/KakaoTalk_20230616_144459289_03.png',
                'https://karyl.s3.ap-northeast-2.amazonaws.com/folder/KakaoTalk_20230616_144459289_04.png'
            ];
            const randomIndex = Math.floor(Math.random() * randomUrls.length);
            userPhoto = [randomUrls[randomIndex]];
        }
    
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
        userPhotoo,
        position,
        userLongitude,
        userLatitude
    ) => {
        console.log("레퍼지 이메일", datata)
        console.log("레퍼지 닉네임", nicknamee)
        console.log("레퍼지 유저포토", userPhotoo)
        console.log("레퍼지 포지션", position)

        const { malmla, nickname, userPhoto } = datata
        console.log("이놈에는 뭐가 담길까",malmla)
        const email = datata.datata
        let qoduf = [userPhoto]
        qoduf.push(userPhoto)
        console.log(qoduf)

        console.log("다시담은 레퍼지 이메일",email)
        console.log("다시담은 레퍼지 닉네임",nickname)
        console.log("다시담은 레퍼지 유저포토",userPhoto)
        const signupData = await this.usersModel.create({
            email,
            nickname,
            userPhoto:qoduf,
            position,
            userLongitude, 
            userLatitude
        });
        return signupData;
    };

    updateuserById = async (userId, hashedPassword, nickname, userPhoto) => {
        await Users.update(
            {
                passward: hashedPassword,
                nickname: nickname,
                userPhoto: userPhoto,
            },
            {
                where: { userId }
            }
        );
    };

    updatenicknameById = async (userId, nickname) => {
        await Users.update(
            {
                nickname: nickname,
            },
            {
                where: { userId }
            }
        );
    };

    updatepassById = async (userId, hashedPassword) => {
        await Users.update(
            {
                password: hashedPassword
            },
            {
                where: { userId }
            }
        );
    };

    updateimageById = async (userId, userPhoto) => {
        await Users.update(
            {
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


    makenewpass = async (phoneNumber) => {
        function generateRandomString() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            const length = Math.floor(Math.random() * 7) + 9; // 9~15 사이의 길이
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
        }
        return result;
        }
        const rendom = generateRandomString();
        const hashedPassword = await bcrypt.hash(rendom, 10);
        await Users.update(
            {
                password: hashedPassword,
            },
            {
                where: { phoneNumber }
            }
        );
        return rendom
    };

    findphone = async (phoneNumber) => {
        const userdata = await this.usersModel.findOne({
            where: { phoneNumber },
        });
        return userdata;
    };



}

module.exports = UserRepository;
