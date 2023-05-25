const UserRepository = require("../(3)repositories/users.repository");
const TokenRepository = require("../(3)repositories/tokens.repository");
const createAuthCode = require("../modules/utils")
const send_message = require("../modules/smsService")
const jwt = require("jsonwebtoken");
const { Users } = require("../models");


class UserService {
    userRepository = new UserRepository(Users);
    // tokenRepository = new TokenRepository();


    findNickname = async (nickname) => {
        const existNickname = await this.userRepository.findNickname(nickname);
        return existNickname;
    };

    signup = async (
        nickname,
        password,
        userPhoto,
        email,
        introduction,
    ) => {
        const signupData = await this.userRepository.signup(
            nickname,
            password,
            userPhoto,
            email,
            introduction,
        );
        return signupData;
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

    authCodeSend = async (nickname, phoneNum) => {
        try {
            const authcode = createAuthCode();
            await this.userRepository.authCodeSend(authcode, phoneNum)
            send_message(nickname, phoneNum, authcode)
            return { "message": "메세지 발송완료" }
        } catch (error) {
            console.error(error);
            return { "errorMessage": "인증번호 요청에 실패하였습니다." }
        }
    };

    authCodeVaildation = async (code, phoneNum) => {
        try {
            const authCode = await this.userRepository.authCodeVaildation(phoneNum)
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

}

module.exports = UserService;
