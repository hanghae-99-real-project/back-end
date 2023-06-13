const UserRepository = require("../repositories/Users.repository.js");
const TokenRepository = require("../repositories/tokens.repository.js");
const createAuthCode = require("../modules/utils.js")
const send_message = require("../modules/smsService.js")
const jwt = require("jsonwebtoken");
const { Users } = require("../models/index.js");
const axios = require("axios");
const { UserDao } = require("../models/index.js");
require('dotenv').config();
const querystring = require('querystring');
const qs = require('qs');
const redisClient = require('../modules/redisClient.js');
const bcrypt = require("bcrypt");



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
        phoneNumber,
        position,
        userPhoto
    ) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const signupData = await this.userRepository.signup(
                nickname,
                hashedPassword,
                phoneNumber,
                position,
                userPhoto
            );
            return signupData;
        } catch (error) {
            throw new Error("회원 가입 중 에러가 발생했습니다.");
        }
    };

    // 회원탈퇴 API
    deleteSignup = async (userId) => {
        await this.userRepository.deleteSignup(userId);
        return;
    };


    loginUser = async (phoneNumber) => {
        const loginUser = await this.userRepository.login(phoneNumber);
        return loginUser;
    };


    createAccessToken = async (loginUser) => {
        const { userId } = loginUser;
        const accessToken = jwt.sign({ userId: userId }, process.env.ACCESS_KEY, {
            expiresIn: process.env.ACCESS_EXPIRES,
        });
        return accessToken;
    };

    createKAccessToken = async (jaja) => {
        const userId = jaja;
        console.log("유저아이디 잘 들어갔는지 확인",userId)
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


    // 카카오 로그인
    signInKakao = async (kakaoToken) => {
        const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${kakaoToken}`,
            },
        });

        const { data } = result;
        console.log("데이터 전문", data)
        console.log("email 타입:", typeof data.kakao_account.email);
        let nicknamee = data.properties.nickname;
        let datata = data.kakao_account.email;
        let userPhotoo = data.properties.profile_image;
        console.log("닉네임", nicknamee)
        console.log("이메일", datata)
        console.log("프로필 이미지", userPhotoo)

        if (!nicknamee || !datata) throw new Error("KEY_ERROR", 400);

        const user = await this.userRepository.loginkakao(datata);

        if (user == null) {
            const kakaouser = await this.userRepository.signupkakao({
                datata: datata,
                nickname: nicknamee,
                userPhoto: userPhotoo,
            });
            const kakaocall  = await this.userRepository.loginkakao(datata);
            const userId = kakaocall.userId
            console.log(userId)
            return userId;
        } else {
            const userId  = user.userId
            console.log(userId)
            return userId;
        }
    };

    // 엑세스 토큰 받아오기
    getTokens = async (authCode) => {
        console.log("어쓰코드", authCode)
        console.log("쿼리스트링", querystring.stringify({
            Content_Type: "authorization_code",
            client_id: process.env.KAKAO_CLIENT_ID,
            client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
            redirect_uri: process.env.KAKAO_REDIRECT_URI,
            code: authCode,
        }))
        const response = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            querystring.stringify({
                grant_type: "authorization_code",
                client_id: process.env.KAKAO_CLIENT_ID,
                client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code: authCode,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            }
        );
        console.log("뭘 얼마나 많이 던져주는지 보자", response.data)
        const { access_token } = response.data;
        console.log("요건 내가 뽑아쓰는 엑세스 토큰", access_token)
        return access_token;
    };


    updateuser = async (
        userId,
        hashedPassword,
        nickname,
        userPhoto,
    ) => {
        if (!hashedPassword || !nickname) {
            throw new Error("입력 값이 유효하지 않습니다.");
        }

        if (userId == null) {
            throw new Error(" 유저 아이디가 null 입니다");
        }

        await this.userRepository.updateuserById(
            userId,
            hashedPassword,
            nickname,
            userPhoto,
        );
    };

};
module.exports = UserService;
