const UserRepository = require("../(3)repositories/Users.repository");
const TokenRepository = require("../(3)repositories/tokens.repository");
const createAuthCode = require("../modules/utils")
const send_message = require("../modules/smsService")
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const axios = require("axios");
const { UserDao } = require("../models");


class UserService {
    userRepository = new UserRepository(Users);
    tokenRepository = new TokenRepository();


    findNickname = async (nickname) => {
        const existNickname = await this.userRepository.findNickname(nickname);
        return existNickname;
    };

    signup = async (
        nickname,
        password,
        userPhoto,
        position,
        phoneNumber,
        introduction,
        userLongitude,
        userLatitude
    ) => {
        const signupData = await this.userRepository.signup(
            nickname,
            password,
            userPhoto,
            position,
            phoneNumber,
            introduction,
            userLongitude,
            userLatitude
        );
        return signupData;
    };

    processKakaoLogin = async (profile) => {
        try {

            const { id, username, email } = profile;

            const user = await this.userRepository.findOrCreateUser(id, username, email);
            return user;
        } catch (error) {
            throw new Error('Failed to process Kakao login.');
        }
    };

    // 회원탈퇴 API
    deleteSignup = async (userId) => {
        await this.userRepository.deleteSignup(userId);
        return;
    };


    loginUser = async (nickname) => {
        const loginUser = await this.userRepository.login(nickname);
        return loginUser;
    };


    createAccessToken = async (loginUser) => {
        const { userId } = loginUser;
        const accessToken = jwt.sign({ userId: userId }, process.env.ACCESS_KEY, {
            expiresIn: process.env.ACCESS_EXPIRES,
        });
        return accessToken;
    };


    createRefreshToken = async () => {
        const refreshToken = jwt.sign({}, process.env.REFRESH_KEY, {
            expiresIn: process.env.REFRESH_EXPIRES,
        });
        return refreshToken;
    };



    saveToken = async (loginUser, refreshToken) => {
        const { userId } = loginUser;
        await this.tokenRepository.saveToken(userId, refreshToken);
    };


    logout = async (userId) => {
        await this.tokenRepository.deleteToken(userId);
        return;
    };

    authCodeSend = async (phoneNumber) => {
        try {
            const authcode = createAuthCode();
            await this.userRepository.authCodeSend(authcode, phoneNumber)
            send_message(phoneNumber, authcode)
            return { "message": "메세지 발송완료" }
        } catch (error) {
            console.error(error);
            return { "errorMessage": "인증번호 요청에 실패하였습니다." }
        }
    };

    authCodeValidation = async (code, phoneNumber) => {
        try {
            const authCode = await this.userRepository.authCodeValidation(phoneNumber)
            if (!code) {
                throw new Error("400/인증코드가 입력되지 않았습니다.")
            }
            if (authCode !== code) {
                throw new Error("400/입력된 코드가 일치하지 않습니다.")
            }
            if (!authCode) {
                throw new Error("400/인증코드가 만료 되었습니다.")
            }
            return { "message": "인증번호 확인완료" }
        } catch (error) {
            error.failedApi = "인증번호 검사";
            throw error;
        }
    };

//카카오로그인
    signInKakao = async (kakaoToken) => {
        const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        },
        });

        const { data } = result;
        const name = data.properties.nickname;
        const email = data.kakao_account.email;
        const kakaoId = data.id;
        const profileImage = data.properties.profile_image;

        if (!name || !email || !kakaoId) throw new Error("KEY_ERROR", 400);

        const user = await UserDao.findOne({
        where: {
            kakao_id: kakaoId
        }
        });

        if (!user) {
        await UserDao.create({
            account_email: email,
            name: name,
            kakao_id: kakaoId,
            profile_image: profileImage
        });
    }

        return jwt.sign({ kakao_id: user.kakao_id }, process.env.TOKEN_SECRET);
};


};
module.exports = UserService;
