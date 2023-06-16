const UserRepository = require("@repositories/Users.repository.js");
const TokenRepository = require("@repositories/tokens.repository.js");
const createAuthCode = require("@modules/utils.js")
const send_message = require("@modules/smsService.js")
const jwt = require("jsonwebtoken");
const { Users } = require("@models/index.js");
const axios = require("axios");
const { UserDao } = require("@models/index.js");
require('dotenv').config();
const querystring = require('querystring');
const qs = require('qs');
const redisClient = require('@modules/redisClient.js');
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
            const signupData = await this.userRepository.signup(
                nickname,
                password,
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
        // console.log("유저아이디 잘 들어갔는지 확인", userId)
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_KEY, {
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
            error.failedApi = "인증번호 요청에";
            throw error;
        }
    };

    authCodeValidation = async (code, phoneNumber) => {
        try {
            const authCode = await this.userRepository.authCodeValidation(phoneNumber)
            if (!code) {
                throw new Error("401/인증코드가 입력되지 않았습니다.")
            }
            if (authCode !== code) {
                throw new Error("401/입력된 코드가 일치하지 않습니다.")
            }
            if (!authCode) {
                throw new Error("401/인증코드가 만료 되었습니다.")
            }
            return { "message": "인증번호 확인완료" }
        } catch (error) {
            error.failedApi = "인증번호 검사";
            throw error;
        }
    };


    // 카카오 로그인
    signInKakao = async (kakaoToken, position) => {
        const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${kakaoToken}`,
            },
        });

        const { data } = result;
        let nicknamee = data.properties.nickname;
        let datata = data.kakao_account.email;
        let userPhotoo = data.properties.profile_image;

        if (!nicknamee || !datata) throw new Error("KEY_ERROR", 400);

        const user = await this.userRepository.loginkakao(datata);

        if (user == null) {
            const kakaouser = await this.userRepository.signupkakao({
                datata: datata,
                nickname: nicknamee,
                userPhoto: userPhotoo,
                position
            });
            const kakaocall = await this.userRepository.loginkakao(datata);
            const userId = kakaocall.userId
            return userId;
        } else {
            const userId = user.userId
            return userId;
        }
    };

    // 엑세스 토큰 받아오기
    getTokens = async (authCode) => {
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
        const { access_token } = response.data;
        return access_token;
    };


    updateuser = async (userId, hashedPassword, nickname, userPhoto,) => {
        if (!hashedPassword || !nickname) {
            throw new Error("401/입력 값이 유효하지 않습니다.");
        }

        if (userId == null) {
            throw new Error("401/유저 아이디가 null 입니다");
        }

        await this.userRepository.updateuserById(
            userId,
            hashedPassword,
            nickname,
            userPhoto,
        );
    };

    updateimage = async (userId, userPhoto, imageIndex) => {


        if (userId == null) {
            throw new Error("401/유저 아이디가 null 입니다");
        }

        if (imageIndex <= 4) {
            const profileImageUrl = await redisClient.LINDEX("image", imageIndex);
            return profileImageUrl
        }

        else {
            if (!userPhoto) {
                console.log(userPhoto)
                throw new Error("401/유저 포토가 입력되지 않았습니다.");
            }
            await this.userRepository.updateimageById(
                userId,
                userPhoto,
            );
            return { message: "이미지를 수정하였습니다." }
        }

    };

    updatepass = async (userId, hashedPassword) => {
        if (!hashedPassword) {
            console.log(hashedPassword)
            throw new Error("401/바꿀 패스워드 값을 입력해주세요.");
        }

        if (userId == null) {
            throw new Error("401/유저 아이디가 null 입니다");
        }

        await this.userRepository.updatepassById(
            userId,
            hashedPassword,
        );
    };


    updatenickname = async (userId, nickname) => {
        if (!nickname) {
            console.log(nickname)
            throw new Error("401/닉네임이 들어오지 않았습니다.");
        }

        if (userId == null) {
            throw new Error("401/유저 아이디가 null 입니다");
        }

        await this.userRepository.updatenicknameById(
            userId,
            nickname
        );
    };

    newpass = async (phoneNumber) => {
        if (!phoneNumber) {
            console.log(phoneNumber)
            throw new Error("401/휴대폰 번호를 입력해주세요.");
        }

        const ssapping = await this.userRepository.makenewpass(phoneNumber);
        return ssapping
    };

    findphone = async (phoneNumber) => {
        if (!phoneNumber) {
            console.log(phoneNumber)
            throw new Error("401/휴대폰번호를 입력해주세요.");
        }
        const findphonenumnum = await this.userRepository.findphone(phoneNumber);
        return findphonenumnum ;
    };

};
module.exports = UserService;
